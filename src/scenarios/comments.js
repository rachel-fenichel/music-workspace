
export const comments = {
  'workspaceComments': [
    {
      'height': 100,
      'width': 146.63990783691406,
      'id': 'workspace_comment_1',
      'x': 96.5390625,
      'y': 531.42578125,
      'text': 'Workspace comment',
    },
  ],
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
              'icons': {
                'comment': {
                  'text': 'Pinned block comment',
                  'pinned': true,
                  'height': 80,
                  'width': 160,
                },
              },
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
              'next': {
                'block': {
                  'type': 'simple_circle',
                  'id': 'draw_circle_2',
                  'icons': {
                    'comment': {
                      'text': 'Unpinned block comment',
                      'pinned': false,
                      'height': 80,
                      'width': 160,
                    },
                  },
                  'inputs': {
                    'COLOR': {
                      'shadow': {
                        'type': 'colour_picker',
                        'id': 'draw_circle_2_color',
                        'fields': {
                          'COLOUR': '#000000',
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
    ],
  },
};
