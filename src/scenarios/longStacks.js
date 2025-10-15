const stackOfBlocks = {
    "block": {
        "type": "purple_block",
        "next": {
            "block": {
                "type": "red_block",
                "next": {
                    "block": {
                        "type": "green_block",
                        "next": {
                            "block": {
                                "type": "purple_block",
                                "next": {
                                    "block": {
                                        "type": "red_block",
                                        "next": {
                                            "block": {
                                                "type": "green_block",
                                                "next": {
                                                    "block": {
                                                        "type": "purple_block",
                                                        "next": {
                                                            "block": {
                                                                "type": "red_block",
                                                                "next": {
                                                                    "block": {
                                                                        "type": "green_block",
                                                                        "next": {
                                                                            "block": {
                                                                                "type": "purple_block",
                                                                                "next": {
                                                                                    "block": {
                                                                                        "type": "red_block",
                                                                                        "next": {
                                                                                            "block": {
                                                                                                "type": "green_block",
                                                                                                "next": {
                                                                                                    "block": {
                                                                                                        "type": "purple_block",
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            },
                        }
                    }
                }
            }
        }
    }
};

export const longStack = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "x": 100,
                "y": 100,
                "type": "red_block",
                "next": stackOfBlocks
            }
        ]
    }
};

export const sixStacks = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "x": 100,
                "y": 100,
                "type": "red_block",
                "next": stackOfBlocks
            },
            {
                "x": 400,
                "y": 800,
                "type": "red_block",
                "next": stackOfBlocks
            },
            {
                "x": 600,
                "y": 900,
                "type": "red_block",
                "next": stackOfBlocks
            },
            {
                "x": 400,
                "y": 100,
                "type": "red_block",
                "next": stackOfBlocks
            },
            {
                "x": 600,
                "y": 100,
                "type": "red_block",
                "next": stackOfBlocks
            },
            {
                "x": 800,
                "y": 100,
                "type": "red_block",
                "next": stackOfBlocks
            },
        ]
    }
}

export const ifStack = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "type": "controls_if",
                "x": 138,
                "y": 88,
                "icons": {
                    "comment": {
                        "text": "This program is a long stack of blocks with no more than one level of nesting. Simple animations often look like this.",
                        "pinned": true,
                        "height": 100,
                        "width": 200
                    }
                },
                "inputs": {
                    "DO0": {
                        "block": {
                            "type": "red_block",
                            "next": {
                                "block": {
                                    "type": "red_block",
                                    "next": {
                                        "block": {
                                            "type": "red_block",
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "next": {
                    "block": {
                        "type": "purple_block",
                        "next": {
                            "block": {
                                "type": "purple_block",
                                "next": {
                                    "block": {
                                        "type": "controls_if",
                                        "inputs": {
                                            "DO0": {
                                                "block": {
                                                    "type": "green_block",
                                                    "next": {
                                                        "block": {
                                                            "type": "green_block",
                                                            "next": stackOfBlocks
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "next": stackOfBlocks
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
};