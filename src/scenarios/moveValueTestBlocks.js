
export const moveValueTestBlocks = {
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
        'type': 'text_join',
        'id': 'join0',
        'x': 75,
        'y': 200,
      },
      {
        'type': 'p5_draw',
        'id': 'p5_draw',
        'x': 75,
        'y': 300,
        'deletable': false,
        'inputs': {
          'STATEMENTS': {
            'block': {
              'type': 'text_print',
              'id': 'print1',
              'next': {
                'block': {
                  'type': 'text_print',
                  'id': 'print2',
                  'inputs': {
                    'TEXT': {
                      'shadow': {
                        'type': 'text',
                        'id': 'shadow_print2',
                        'fields': {
                          'TEXT': 'shadow',
                        },
                      },
                    },
                  },
                  'next': {
                    'block': {
                      'type': 'draw_emoji',
                      'id': 'draw_emoji',
                      'fields': {
                        'emoji': '🐻',
                      },
                      'next': {
                        'block': {
                          'type': 'text_print',
                          'id': 'print3',
                          'inputs': {
                            'TEXT': {
                              'block': {
                                'type': 'text_join',
                                'id': 'join1',
                                'inline': true,
                                'inputs': {
                                  'ADD0': {
                                    'shadow': {
                                      'type': 'text',
                                      'id': 'shadow_join',
                                      'fields': {
                                        'TEXT': 'inline',
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          'next': {
                            'block': {
                              'type': 'controls_repeat_ext',
                              'id': 'controls_repeat_ext',
                              'inputs': {
                                'TIMES': {
                                  'shadow': {
                                    'type': 'math_number',
                                    'id': 'shadow_repeat',
                                    'fields': {
                                      'NUM': 1,
                                    },
                                  },
                                },
                                'DO': {
                                  'block': {
                                    'type': 'text_print',
                                    'id': 'print4',
                                    'inputs': {
                                      'TEXT': {
                                        'block': {
                                          'type': 'text_join',
                                          'id': 'join2',
                                          'inline': false,
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