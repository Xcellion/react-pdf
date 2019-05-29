import resolvePageSizes from '../../src/layout/resolvePageSizes';

describe('layout resolvePageSizes', () => {
  test('Should default to A4', () => {
    const root = {
      type: 'ROOT',
      children: [{ type: 'DOCUMENT', children: [{ type: 'PAGE', props: {} }] }],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 595.28);
    expect(document.children[0].box).toHaveProperty('height', 841.89);
  });

  test('Should default to portrait A4', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [{ type: 'PAGE', props: { orientation: 'portrait' } }],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 841.89);
    expect(document.children[0].box).toHaveProperty('height', 595.28);
  });

  test('Should accept size string', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [{ type: 'PAGE', props: { size: 'A2' } }],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 1190.55);
    expect(document.children[0].box).toHaveProperty('height', 1683.78);
  });

  test('Should accept size string in portrait mode', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            { type: 'PAGE', props: { size: 'A2', orientation: 'portrait' } },
          ],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 1683.78);
    expect(document.children[0].box).toHaveProperty('height', 1190.55);
  });

  test('Should accept size array', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [{ type: 'PAGE', props: { size: [100, 200] } }],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 100);
    expect(document.children[0].box).toHaveProperty('height', 200);
  });

  test('Should accept size array in portrait mode', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              props: { size: [100, 200], orientation: 'portrait' },
            },
          ],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 200);
    expect(document.children[0].box).toHaveProperty('height', 100);
  });

  test('Should accept size object', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            { type: 'PAGE', props: { size: { width: 100, height: 200 } } },
          ],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 100);
    expect(document.children[0].box).toHaveProperty('height', 200);
  });

  test('Should accept size object in portrait mode', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              props: {
                size: { width: 100, height: 200 },
                orientation: 'portrait',
              },
            },
          ],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 200);
    expect(document.children[0].box).toHaveProperty('height', 100);
  });

  test('Should accept size number', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [{ type: 'PAGE', props: { size: 100 } }],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 100);
    expect(document.children[0].box).toHaveProperty('height', undefined);
  });

  test('Should accept size number in portrait mode', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            { type: 'PAGE', props: { size: 100, orientation: 'portrait' } },
          ],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', undefined);
    expect(document.children[0].box).toHaveProperty('height', 100);
  });

  test('Should resolve several pages', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            { type: 'PAGE', props: {} },
            { type: 'PAGE', props: { size: 'A5' } },
            { type: 'PAGE', props: { size: { width: 100, height: 200 } } },
          ],
        },
      ],
    };
    const result = resolvePageSizes(root);
    const document = result.children[0];

    expect(document.children[0].box).toHaveProperty('width', 595.28);
    expect(document.children[0].box).toHaveProperty('height', 841.89);
    expect(document.children[1].box).toHaveProperty('width', 419.53);
    expect(document.children[1].box).toHaveProperty('height', 595.28);
    expect(document.children[2].box).toHaveProperty('width', 100);
    expect(document.children[2].box).toHaveProperty('height', 200);
  });
});