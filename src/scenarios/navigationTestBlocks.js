export 
const navigationTestBlocks = {
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
              'id': 'p5_canvas_1',
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
        'type': 'p5_draw',
        'id': 'p5_draw_1',
        'x': 0,
        'y': 332,
        'deletable': false,
        'inputs': {
          'STATEMENTS': {
            'block': {
              'type': 'controls_if',
              'id': 'controls_if_1',
              'next': {
                'block': {
                  'type': 'controls_if',
                  'id': 'controls_if_2',
                  'inputs': {
                    'IF0': {
                      'block': {
                        'type': 'logic_boolean',
                        'id': 'logic_boolean_1',
                        'fields': {
                          'BOOL': 'TRUE',
                        },
                      },
                    },
                    'DO0': {
                      'block': {
                        'type': 'text_print',
                        'id': 'text_print_1',
                        'inputs': {
                          'TEXT': {
                            'shadow': {
                              'type': 'text',
                              'id': 'text_1',
                              'fields': {
                                'TEXT': 'abc',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  'next': {
                    'block': {
                      'type': 'controls_repeat',
                      'id': 'controls_repeat_1',
                      'fields': {
                        'TIMES': 10,
                      },
                      'inputs': {
                        'DO': {
                          'block': {
                            'type': 'draw_emoji',
                            'id': 'draw_emoji_1',
                            'fields': {
                              'emoji': '❤️',
                            },
                            'next': {
                              'block': {
                                'type': 'simple_circle',
                                'id': 'simple_circle_1',
                                'inputs': {
                                  'COLOR': {
                                    'shadow': {
                                      'type': 'colour_picker',
                                      'id': 'colour_picker_1',
                                      'fields': {
                                        'COLOUR': '#ff0000',
                                      },
                                    },
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
                          'id': 'controls_repeat_ext_1',
                          'inputs': {
                            'TIMES': {
                              'shadow': {
                                'type': 'math_number',
                                'id': 'math_number_1',
                                'fields': {
                                  'NUM': 10,
                                },
                              },
                              'block': {
                                'type': 'math_modulo',
                                'id': 'math_modulo_1',
                                'inputs': {
                                  'DIVIDEND': {
                                    'shadow': {
                                      'type': 'math_number',
                                      'id': 'math_number_2',
                                      'fields': {
                                        'NUM': 64,
                                      },
                                    },
                                  },
                                  'DIVISOR': {
                                    'shadow': {
                                      'type': 'math_number',
                                      'id': 'math_number_3',
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