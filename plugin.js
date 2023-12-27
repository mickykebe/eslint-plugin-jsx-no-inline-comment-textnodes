'use strict';

const report = require('./utils/report');

const messages = {
  putInlineCommentInBraces:
    'Inline comments inside children section of tag should be replaced with block comments',
};

function checkText(node, context) {
  // since babel-eslint has the wrong node.raw, we'll get the source text
  const rawValue = context.getSourceCode().getText(node);
  if (/^\s*\/\//m.test(rawValue)) {
    // inside component, e.g. <div>literal</div>
    if (
      node.parent.type !== 'JSXAttribute'
      && node.parent.type !== 'JSXExpressionContainer'
      && node.parent.type.indexOf('JSX') !== -1
    ) {
      report(
        context,
        messages.putInlineCommentInBraces,
        'putInlineCommentInBraces',
        {
          node,
          fix(fixer) {
            return fixer.replaceText(
              node,
              `{/*${rawValue.replace(/^\s*\/\//gm, '')}*/}`
            );
          },
        }
      );
    }
  }
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow single line comments from being inserted as text nodes',
    },
    fixable: 'code',
    schema: [],
    messages,
  },
  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      Literal(node) {
        checkText(node, context);
      },
      JSXText(node) {
        checkText(node, context);
      },
    };
  },
};
