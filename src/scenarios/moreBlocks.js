export const moreBlocks = {
  'blocks': {
    'languageVersion': 0,
    'blocks': [
      {
        'type': 'p5_setup',
        'id': '5.{;T}3Qv}Awi:1M$:ut',
        'x': 0,
        'y': 75,
        'deletable': false,
        'inputs': {
          'STATEMENTS': {
            'block': {
              'type': 'p5_canvas',
              'id': 'spya_H-5F=K8+DhedX$y',
              'deletable': false,
              'movable': false,
              'fields': {
                'WIDTH': 400,
                'HEIGHT': 400,
              },
              'next': {
                'block': {
                  'type': 'p5_background_color',
                  'id': 'i/Hvi~^DYffkN/WpT_Ck',
                  'inputs': {
                    'COLOR': {
                      'shadow': {
                        'type': 'colour_picker',
                        'id': 'B:zpi7kg+.GF_Dutd9GL',
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
        'id': '3iI4f%2#Gmk}=OjI7(8h',
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
                    'id': 'gq(POne}j:hVw%C3t{vx',
                    'fields': {
                      'COLOUR': '#ffff00',
                    },
                  },
                },
              },
              'next': {
                'block': {
                  'type': 'text_print',
                  'id': 'text_print_1',
                  'inputs': {
                    'TEXT': {
                      'shadow': {
                        'type': 'text',
                        'id': 'text_print_shadow_text_1',
                        'fields': {
                          'TEXT': 'abc',
                        },
                      },
                    },
                  },
                  'next': {
                    'block': {
                      'type': 'controls_if',
                      'id': ',rP|uDy,esfrOeQrk64u',
                      'inputs': {
                        'IF0': {
                          'block': {
                            'type': 'logic_negate',
                            'id': '8iH/,SwwTfk7iR;~m^s[',
                          },
                        },
                        'DO0': {
                          'block': {
                            'type': 'text_print',
                            'id': 'text_print_2',
                            'inputs': {
                              'TEXT': {
                                'shadow': {
                                  'type': 'text',
                                  'id': 'j|)#Di2,(L^TK)iLI3LC',
                                  'fields': {
                                    'TEXT': 'abc',
                                  },
                                },
                                'block': {
                                  'type': 'math_arithmetic',
                                  'id': 'mRTJ4D+(mjBnUy8c4KaT',
                                  'fields': {
                                    'OP': 'ADD',
                                  },
                                  'inputs': {
                                    'A': {
                                      'shadow': {
                                        'type': 'math_number',
                                        'id': 'hxGO;t4bA9$.~|E6Gy~H',
                                        'fields': {
                                          'NUM': 1,
                                        },
                                      },
                                    },
                                    'B': {
                                      'shadow': {
                                        'type': 'math_number',
                                        'id': 'P,$Lqn5{mFE?R)#~v|/V',
                                        'fields': {
                                          'NUM': 1,
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
                      'next': {
                        'block': {
                          'type': 'text_print',
                          'id': 'text_print_3',
                          'inputs': {
                            'TEXT': {
                              'shadow': {
                                'type': 'text',
                                'id': 'cy+0[WR6]O(x%Q;~c*0f',
                                'fields': {
                                  'TEXT': 'abc',
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
