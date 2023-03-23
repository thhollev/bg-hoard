import {
  formatFiles,
  getProjects,
  ProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';

const getScopes = (projectMap: Map<string, ProjectConfiguration>) => {
  const projects: any[] = Array.from(projectMap.values());
  const allScopes: string[] = projects
    .map((project) =>
      project.tags
        // take only those that point to scope
        .filter((tag: string) => tag.startsWith('scope:'))
    )
    // flatten the array
    .reduce((acc, tags) => [...acc, ...tags], [])
    // remove prefix `scope:`
    .map((scope: string) => scope.slice(6));
  // remove duplicates
  return Array.from(new Set(allScopes));
};

const updateSchemaJson = (tree: Tree, scopes: string[]) => {
  updateJson(
    tree,
    'libs/internal-plugin/src/generators/util-lib/schema.json',
    (schemaJson) => {
      schemaJson.properties.directory['x-prompt'].items = scopes.map(
        (scope) => ({
          value: scope,
          label: scope,
        })
      );
      return schemaJson;
    }
  );
};

function addScopeIfMissing(host: Tree) {
  const projectMap = getProjects(host);
  Array.from(projectMap.keys()).forEach((projectName) => {
    const project = projectMap.get(projectName);
    if (!project.tags.some((tag) => tag.startsWith('scope:'))) {
      const scope = projectName.split('-')[0];
      project.tags.push(`scope:${scope}`);
      updateProjectConfiguration(host, projectName, project);
    }
  });
}

const updateSchemaInterface = (tree: Tree, scopes: string[]) => {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const interfaceDefinitionFilePath =
    'libs/internal-plugin/src/generators/util-lib/schema.d.ts';
  const newContent = `export interface UtilLibGeneratorSchema {
  name: string;
  directory: ${joinScopes};
}`;
  tree.write(interfaceDefinitionFilePath, newContent);
};

export default async function (tree: Tree) {
  const scopes = getScopes(getProjects(tree));
  updateSchemaJson(tree, scopes);
  updateSchemaInterface(tree, scopes);
  addScopeIfMissing(tree);
  await formatFiles(tree);
}
