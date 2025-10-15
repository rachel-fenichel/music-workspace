
export const simpleCircle = {
  'blocks': {
    'languageVersion': 0,
    'blocks': [
      {
        'type': 'p5_setup',
        'id': 'p5_setup_1',
        'x': 0,
        'y': 75,
        'deletable': false,
        'inputs': {
          'STATEMENTS': {
            'block': {
              'type': 'p5_canvas',
              'id': 'create_canvas_1',
              'deletable': false,
              'movable': false,
              'fields': {
                'WIDTH': 400,
                'HEIGHT': 400,
              },
              'next': {
                'block': {
                  'type': 'p5_background_color',
                  'id': 'set_background_color_1',
                  'inputs': {
                    'COLOR': {
                      'shadow': {
                        'type': 'colour_picker',
                        'id': 'set_background_color_1_color',
                        'fields': {
                          'COLOUR': '#9999ff',
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
        'id': 'p5_draw_1',
        'x': 0,
        'y': 332,
        'deletable': false,
        'inputs': {
          'STATEMENTS': {
            'block': {
              'type': 'simple_circle',
              'id': 'draw_circle_1',
              'inline': true,
              'inputs': {
                'COLOR': {
                  'shadow': {
                    'type': 'colour_picker',
                    'id': 'draw_circle_1_color',
                    'fields': {
                      'COLOUR': '#ffff00',
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
};
