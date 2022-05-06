// FIXME remove this rule
// eslint-disable-next-line import/no-unresolved
import { copyWar } from '@adguard/tswebextension/cli';
import path from 'path';

import { buildRunner } from './build-runner';
import { config } from './webpack.config';

const build = async () => {
    try {
        await buildRunner(config);
        await copyWar(path.resolve(__dirname, '../../build/war'));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

build();
