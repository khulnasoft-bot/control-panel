import { Meta } from '@storybook/react';

import { createDate } from 'src/utils/date';
import { create } from 'src/utils/factories';

import { DeploymentInfo } from './deployment-info';

export default {
  title: 'Components/DeploymentInfo',
} satisfies Meta;

const app = create.app({
  name: 'snipkit',
  domains: [create.appDomain({ name: 'app.snipkit.com' })],
});

const service = create.service({
  name: 'api-gateway',
});

const deployment = create.computeDeployment({
  definition: create.deploymentDefinition({
    source: {
      type: 'git',
      repository: 'github.com/snipkit/api',
      branch: 'master',
      autoDeploy: true,
    },
    builder: { type: 'buildpack' },
    privileged: false,
    instanceType: 'large',
    regions: ['was', 'sin', 'par'],
    environmentVariables: [
      create.environmentVariable({ name: 'ANSWER', value: '42' }),
      create.environmentVariable({ name: 'URL', value: 'https://{{ SNIPKIT_PUBLIC_DOMAIN }}' }),
    ],
    ports: [
      { portNumber: 3000, protocol: 'http2', path: '/v1' },
      { portNumber: 8000, protocol: 'http', path: '/' },
      { portNumber: 4242, protocol: 'tcp' },
    ],
  }),
  build: {
    status: 'COMPLETED',
    sha: 'a9b839512a1aecbb6c82c1c3e67fdf559b15eea8',
    startedAt: createDate(),
    finishedAt: createDate(),
  },
});

export const deploymentInfo = () => <DeploymentInfo app={app} service={service} deployment={deployment} />;
