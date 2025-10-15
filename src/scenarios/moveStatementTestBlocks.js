
// A bunch of statement blocks.  It is intended that statement blocks
// to be moved can be attached to the next connection of p5_canvas,
// and then be (constrained-)moved up, down, left and right to verify
// that they visit all the expected candidate connections.
export const moveStatementTestBlocks = {
  'blocks': {
    'languageVersion': 0,
    'blocks': [
      {
        'type': 'p5_setup',
        'id': 'p5_setup',
        'x': 75,
        'y': 75,
        'deletable': false,
        'inputs': {
          'STATEMENTS': {
            'block': {
              'type': 'p5_canvas',
              'id': 'p5_canvas',
              'deletable': false,
              'movable': false,
              'fields': {
                'WIDTH': 400,
                'HEIGHT': 400,
              },
            },
          },
        },
      },
      {
        'type': 'text_print',
        'id': 'text_print',
        'disabledReasons': ['MANUALLY_DISABLED'],
        'x': 75,
        'y': 400,
        'inputs': {
          'TEXT': {
            'shadow': {
              'type': 'text',
              'id': 'shadow_text',
              'fields': {
                'TEXT': 'abc',
              },
            },
          },
        },
        'next': {
          'block': {
            'type': 'controls_if',
            'id': 'controls_if',
            'extraState': {
              'elseIfCount': 1,
              'hasElse': true,
            },
            'inputs': {
              'DO0': {
                'block': {
                  'type': 'controls_repeat_ext',
                  'id': 'controls_repeat_ext',
                  'inputs': {
                    'TIMES': {
                      'shadow': {
                        'type': 'math_number',
                        'id': 'shadow_math_number',
                        'fields': {
                          'NUM': 10,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        'type': 'p5_draw',
        'id': 'p5_draw',
        'x': 75,
        'y': 950,
        'deletable': false,
      },
    ],
  },
};