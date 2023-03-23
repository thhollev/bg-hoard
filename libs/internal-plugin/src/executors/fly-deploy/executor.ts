import { execSync } from 'child_process';
import { FlyDeployExecutorSchema } from './schema';

export default async function runExecutor(options: FlyDeployExecutorSchema) {
  const cwd = options.distLocation;
  const results = execSync(`fly apps list`, { encoding: 'utf-8' });
  if (results.toString().includes(options.flyAppName)) {
    execSync(`fly deploy`, { cwd, stdio: 'inherit' });
  } else {
    execSync(`fly launch --now --name=${options.flyAppName} --region=ams`, {
      cwd,
      stdio: 'inherit',
    });
  }
  return {
    success: true,
  };
}
