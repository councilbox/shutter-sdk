import tseslint from 'typescript-eslint';
import rules from '@councilbox/shutter-eslint-config-base';

export default tseslint.config(...rules);