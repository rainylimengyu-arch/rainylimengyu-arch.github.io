import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default;

test('language hooks remain at component top level, outside event handlers', () => {
  const errors = [];
  const source = new URL('../src/', import.meta.url);
  for (const file of readdirSync(source).filter(name => name.endsWith('.jsx'))) {
    const ast = parse(readFileSync(new URL(file, source), 'utf8'), {
      sourceType: 'module', plugins: ['jsx'],
    });
    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name !== 'useI18n') return;
        const owner = path.getFunctionParent();
        const name = owner?.node.id?.name ||
          (owner?.parentPath.isVariableDeclarator() ? owner.parentPath.node.id.name : '');
        const declaration = path.parentPath.parentPath;
        const topLevel = declaration.isVariableDeclaration() &&
          declaration.parentPath === owner?.get('body');
        if (!/^(?:[A-Z]|use[A-Z])/.test(name) || !topLevel)
          errors.push(`${file}:${path.node.loc.start.line}: ${name || 'anonymous'} must not call a language hook here`);
      },
    });
  }
  assert.deepEqual(errors, []);
});
