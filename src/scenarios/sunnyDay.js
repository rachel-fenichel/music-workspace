export const sunnyDay = {
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
                  'type': 'purple_block',
                  'id': 'i/Hvi~^DYffkN/WpT_Ck',
                  'next': {
                    'block': {
                      'type': 'p5_stroke',
                      'id': 'I}RN|0g#W,(kh2Cx}9)Z',
                      'inputs': {
                        'COLOR': {
                          'shadow': {
                            'type': 'colour_picker',
                            'id': '`i.j^X!DV:9;]X5[6Lq/',
                            'fields': {
                              'COLOUR': '#ffff00',
                            },
                          },
                        },
                      },
                      'next': {
                        'block': {
                          'type': 'p5_fill',
                          'id': 'JlM!Jyw@s5J5/?9fs8Wi',
                          'inputs': {
                            'COLOR': {
                              'shadow': {
                                'type': 'colour_picker',
                                'id': '^a`BlAD,AV]iN^Qvck~E',
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
              'type': 'p5_ellipse',
              'id': '_}!@OHwjAb,2Gi8nT0}L',
              'inline': true,
              'inputs': {
                'X': {
                  'shadow': {
                    'type': 'math_number',
                    'id': '_0MCsD2LK%j.$YOf3#R/',
                    'fields': {
                      'NUM': 100,
                    },
                  },
                },
                'Y': {
                  'shadow': {
                    'type': 'math_number',
                    'id': 'gq(POne}j:hVw%C3t{vx',
                    'fields': {
                      'NUM': 100,
                    },
                  },
                },
                'WIDTH': {
                  'shadow': {
                    'type': 'math_number',
                    'id': '3RP[-C^1|8zA.^]81M0m',
                    'fields': {
                      'NUM': 50,
                    },
                  },
                },
                'HEIGHT': {
                  'shadow': {
                    'type': 'math_number',
                    'id': '8kKn|lOU8xckQ+#+Q7=~',
                    'fields': {
                      'NUM': 50,
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
