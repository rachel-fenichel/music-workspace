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
