/**
 * JSGoban v0.5.0alpha
 *
 * A Canvas/JavaScript SGF reader/editor for the game of Go.
 * Some important features:
 *  - Easy to use; acts as a plugin for the popular JQuery framework.
 *  - Fully self-contained; needs no external servers or scripts; all you
 *    need to do is initialize it.
 *  - Very configurable; supports board sizes between 2x2 and 52x52
 *    (1x1 is pointless and 52 is the max for Go in the SGF specification).
 *  - Extensible; public API makes extending JSGoban easy.
 *
 * Copyright (c) 2011, Matthew "rintaun" Lanigan <rintaun@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
(function($) {
    $.fn.JSGoban = (function(options, name) {

        var Board = function(options, where) {
            var obj = this;
            var defaults = {
                images: {
                    buttons: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABNRJREFUeNrsmtFrE0kcx2dTa1SqfRIOhANBEARBEARBKAhCnvJUEML9A8JBRFEiQkUJKEpFqQg+eS8thfOlPY4ehUKhr3cgitKCVAKRSkBQBGvaJj9/s5lZN9ud2ZnJeA3y+8KPbSf5/mbn429nZqcGTK/bGNdU7QAQNQRBwExyxT1pEnmuYNzTfS+lb5VHm+vNX79BfneOrX9tseZGm+UHcyyfz7Fms82+4u978LM9+QHW3GyzDfx9c6vN9u0dCNs2sS2nucebGBWLduaQS6W7GFXLPlQel1zGUgEcE2HarpOLh+u6qFofHnUuEBFWtaLa+RcAOteYBxQAK6JiTNt1cvEk/bc9eVLb2wgmjHbnemD/IAsnhCDGCmJXjANDu8JPghSAlxSdX3IYiItnRyD2ol2JAY8rQIw7wBv3eJ9y/rzm4NHmCsIIwoUoXIzCisRLu1Ntw1htfHGJFWX0uPPvyQosawZsC6LsGV6vlajNBfJBFc8oKKbJxHTZVYEXMB54GqTPXL4q0Rau9Sp82OMAD7Mfr3e+c0Gi3OSiwZi6IkHsRTnAq1mbVgv5zJWmixiP+ilXzmDg9/oE4mWMhw4efa5oTwexyhPVl9gjQmISTG5jVAO/2gcQ+Zx335PHKBdA9wISRKswRDDTNtL9CJEP+I4nj0su61e5foJ4w2HAKk9qO3+r2P62AduqMfpcs5FODpzrd8P2LIi2Hq5bInx4XHJZv4mkDfyTrt3gCMvVc0dUTNaxl4knM1fXTvn71jp1CzM8NNj1fd1oBjBOiJ9fY6yzn1RZZ5S2Oo0xh7EV3zNizGOcNfAfwniCsRbz1ljnXG64H/0coGskVU1AS4sJUZ1pKmF8rFarsLa2BlK1Wg0qlQr31jEKmsFv8yf6NvKL879fYu2/inffyN8LNBXAKwbwZNxNO0QolUqwtLQEKs3MzEChUOD+oqlf0X9RcYgxiXFGA7gonq6ib4BHMJoWALdi8yPXMe5fXl6GLM3NzXH/B4yDJn5F/6l+jKMGj3hB+n0CHLeAJ+Np7KYeT0xMgKnE41wx8Wv67/JbbpP441zxCfCVA8B67IZqfJ4z1eLiIvcvmvg1/Xf5xTxnqhHu9wnwgwPALeHdjQIbNRoN7m+Y+DX9R37x+NqIP/4NHwDlq9yGw3ZHegZQVsZWqxVeXP0yTWy/2rL0uni078LPHbwvxXUd9RZlbFxZWQkvrn6ZRvox3lse5h6N+b0AfObgjXtmp6amjI2zs7PhxdUvPYmfSxbeYsLfs/g8smy5gAwldv+f+eKQpcnJSSu/Tf9icchSSfp9b6SPGy4mXzBOpdzY+dHRUVhYWFDCm56eBjHhnzH1p/Sv9GP8mfG6eV76f8SbiNxQ/6uB90KAVmmUv0qNjY2FW5V6vQ6rq6swPz8P5XJZVs6IjT+l8jL9rPO/IUZEZfK58Rzr/LUw8vsCqDqNOSuq7KRYsf4T8Y/hFuGCyHFErNZvMP7G+ENxRPa/+32dwARsBxX+CwZBT4Pp1d8zwJ3s/GcQASSABJAAEkASASSABJAAkgggASSABJBEAAkgASSAJAJIAAkgASQRQAJIAAkgiQASQAJIAEkEkAASQAJIIoAEkAASQBIBJIAEkACSCCABJIAEkAASQAK4g/omwABTqZOUuP+ljwAAAABJRU5ErkJggg==',
                    background: 'data:image/png;base64,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',
                    stones: 'data:image/png;base64,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',

                },
                sounds: {
                    click:
'data:audio/mp3;base64,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EhkfkwUKCdD+X/5kzLLLKCjl+1BS/qwUFHr5i1UqYliRCCUSih6XEw71/zE/9NMPax/8R/zExD1dMsS9X/ZIsIQlIdJGDRgwtwAscv//81ZbHL+W//ZaR+rKCBOhkasFB//6kgBEe8AM0klaQ5AhHXJKjXhyAEOeRaCRGGAEdAEwtOEEEQ/ZLLLHNZfPwiMhjXyP8y3Zb/0aKFHmXDs5RTt2mjSirj/0aUVcbm5Uu15uVJxxbO0nCRQEfFw8bks8b/3f/5Us7xuVJxZkbLf4SIiQJMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+pIAEVL3j/LUaLMQA0VgZA0WUQwm4gAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqVEFHU3RvbmUgQ2xpY2sgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICU='
                },
                stars: [
                    [4, 4],
                    [4, 10],
                    [4, 16],
                    [10, 4],
                    [10, 10],
                    [10, 16],
                    [16, 4],
                    [16, 10],
                    [16, 16]
                    ],
                size: 30,
                padding: 20,
                labelPadding: 30,
                boardsize: 19,
                rows: 0,
                cols: 0,
                startrow: 1,
                startcol: 1,
                showControls: true,
                controlsWidth: 97,
                labelSize: 18,
                labelFont: 'sans-serif',
                showComments: true,
                commentsHeight: 100,
                border: {
                    width: 1,
                    style: 'solid',
                    color: '#000'
                }
            };
            obj.options = options = $.extend(true, {}, defaults, options);
            for (var n in options.images) {
                var $$src = options.images[n];
                options.images[n] = new Image();
                options.images[n].src = $$src;
            }
            for (var n in options.sounds) {
                options.sounds[n] = $('<audio>').attr('src', options.sounds[n])[0];
            }
            if (!options.showControls) {
                options.controlsWidth = 0;
            }
            if (!options.showComments) {
                options.commentsHeight = 0;
            }

            options.boardsize = Math.max(Math.min(
                options.boardsize, 52), 2);
            options.rows = Math.min(
                options.rows,
                options.boardsize
            );
            options.cols = Math.min(
                options.cols,
                options.boardsize
            );
            if (!options.rows) {
                options.rows = options.boardsize;
            }
            if (!options.cols) {
                options.cols = options.boardsize;
            }

            options.startrow = Math.min(
                options.startrow,
                options.boardsize - options.rows + 1
            );
            options.startcol = Math.min(
                options.startcol,
                options.boardsize - options.cols + 1
            );


            var currentColor = false;

            obj.board = {};
            var boardStones = [];

            var sgf;

            var tools = {
                MOVE: 1,
                EDIT: 2
            };
            var tool = tools.MOVE;

            obj.background = null;

            if (HTMLCanvasElement) {
                HTMLCanvasElement.prototype = $.extend(
                HTMLCanvasElement.prototype, {
                    drawLine: function(x, y, dx, dy) {
                        if (this.getContext) {
                            var ctx = this.getContext('2d');
                            ctx.strokeStyle = 'rgba(0,0,0,.8)';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(dx, dy);
                            ctx.stroke();
                        }
                    },
                    drawCircle: function(x, y, radius) {
                        if (this.getContext) {
                            var ctx = this.getContext('2d');
                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                            ctx.closePath();
                            ctx.fill();
                        }
                    },
                    drawText: function(text, x, y) {
                        if (this.getContext) {
                            var ctx = this.getContext('2d');
                            ctx.font = options.labelSize + 'px ' + options.labelFont;
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(text, x, y);
                        }
                    }
                });
            } else {
                return false;
            }

            this.load = function(sgfdata) {
                sgf = new SGFParser(sgfdata);
                $(where).data('sgf', sgf);
            };

            var onBoard = function(x, y) {
                for (var s in boardStones) {
                    if (boardStones[s] && boardStones[s][0] == x && boardStones[s][1] == y) return true;
                }
                return false;
            };

            var build = function(where) {
                var data = $(where).text();
                var container = $('<div>').addClass('container').css({
                    position: 'absolute',
                    padding: 0,
                    zIndex: 10,
                    margin: 0,
                    backgroundColor: '#DDD',
                    verticalAlign: 'top',
                }).append(
                    $('<canvas>').addClass('goban').css({
                        position: 'absolute',
                        left: options.controlsWidth,
                        backgroundColor: '#FC5',
                        borderWidth: options.border.width,
                        borderStyle: options.border.style,
                        borderColor: options.border.color,
                        zIndex: 11
                    }).text(data)
                );
                if (options.showControls) {
                    container.append(
                        $('<div>').addClass('controls').css({
                            overflow: 'hidden',
                            float: 'left',
                            width: options.controlsWidth,
                            height: (options.rows - 1) * options.size + options.padding*2 + options.labelPadding,
                            margin: 0,
                            zIndex: 11,
                            borderWidth: options.border.width,
                            borderStyle: options.border.style,
                            borderColor: options.border.color,
                            borderRight: 0,
                            padding: 0
                        }).append(
                            $('<h1>').css({
                                margin: 0,
                                fontSize: 14,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor: '#EEE',
                                borderBottomWidth: options.border.width,
                                borderBottomStyle: options.border.style,
                                borderBottomColor: options.border.color,
                            }).text('Controls')
                        ).append(
                            $('<button>').css({
                                width: 18,
                                borderTop: '1px solid #777',
                                borderLeft: '1px solid #777',
                                borderBottom: '1px solid #000',
                                borderRight: '1px solid #000',
                                backgroundImage: 'url(' + options.images.buttons.src + ')',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '0 0',
                                padding: 0,
                                marginLeft: 5,
                                marginRight: 5
                            }).attr('title', 'Start')
                        ).append(
                            $('<button>').css({
                                width: 18,
                                borderTop: '1px solid #777',
                                borderLeft: '1px solid #777',
                                borderBottom: '1px solid #000',
                                borderRight: '1px solid #000',
                                backgroundImage: 'url(' + options.images.buttons.src + ')',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '-16px 0',
                                padding: 0,
                                marginRight: 5
                            }).attr('title', 'Previous')
                        ).append(
                            $('<button>').css({
                                width: 18,
                                borderTop: '1px solid #777',
                                borderLeft: '1px solid #777',
                                borderBottom: '1px solid #000',
                                borderRight: '1px solid #000',
                                backgroundImage: 'url(' + options.images.buttons.src + ')',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '-32px 0',
                                padding: 0,
                                marginRight: 5
                            }).attr('title', 'Next')
                        ).append(
                            $('<button>').css({
                                width: 18,
                                borderTop: '1px solid #777',
                                borderLeft: '1px solid #777',
                                borderBottom: '1px solid #000',
                                borderRight: '1px solid #000',
                                backgroundImage: 'url(' + options.images.buttons.src + ')',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '-48px 0',
                                padding: 0,
                                marginRight: 5
                            }).attr('title', 'End')
                        )
                    );
                }
                if (options.showComments) {
                    container.append(
                        $('<div>').addClass('comments').css({
                            width: (options.cols - 1) * options.size + options.padding*2 + options.labelPadding + options.controlsWidth,
                            minHeight: options.commentsHeight,
                            position: 'absolute',
                            zIndex: 11,
                            top: (options.rows - 1) * options.size + options.padding*2 + options.labelPadding,
                            borderWidth: options.border.width,
                            borderStyle: options.border.style,
                            borderColor: options.border.color,
                            borderTop: 0
                        }).append(
                            $('<p>').css({
                                padding: 5 + options.border.width,
                                margin: 0
                            }).text('HELLO')
                        )
                    );
                }
                $('button', container).mousedown(function(){
                    $(this).css({
                        backgroundColor: '#666',
                        borderTop: '1px solid #000',
                        borderLeft: '1px solid #000',
                        borderBottom: '1px solid #777',
                        borderRight: '1px solid #777'
                    });
                }).mouseup(function(){
                    $(this).css({
                        backgroundColor: '#EEE',
                        borderTop: '1px solid #777',
                        borderLeft: '1px solid #777',
                        borderBottom: '1px solid #000',
                        borderRight: '1px solid #000'
                    });
                }).mouseout(function(){
                    $(this).css({
                        backgroundColor: '#EEE',
                        borderTop: '1px solid #777',
                        borderLeft: '1px solid #777',
                        borderBottom: '1px solid #000',
                        borderRight: '1px solid #000'
                    });
                });
                $(where).empty().append(container);
                options.canvas = $('canvas.goban', where)[0];
                $(options.canvas).bind('mousemove', function(e) {
                    var x = Math.round((
                    e.pageX - (
                    $(this).offset().left + options.padding + options.labelPadding)) / options.size) + options.startcol,
                        y = Math.round((
                        e.pageY - (
                        $(this).offset().top + options.padding + options.labelPadding)) / options.size) + options.startrow;
                    if (x < options.startcol || y < options.startrow || x > options.startcol + (options.cols - 1) || y > options.startrow + (options.rows - 1) || onBoard(x, y)) {
                        draw();
                    } else {
                        switch (tool) {
                        case tools.MOVE:
                            draw();
                            if (!onBoard(x, y)) {
                                stone(x, y, currentColor, true, true);
                            }
                            break;
                        case tools.EDIT:
                            if (!onBoard(x, y)) {
                                draw();
                                if (e.ctrlKey) {
                                    stone(x, y, !currentColor, true, true);
                                } else {
                                    stone(x, y, currentColor, true, true);
                                }
                            }
                            break;
                        }
                    }
                }).bind('mouseout', function(e) {
                    draw();
                }).bind('click', function(e) {
                    var x = Math.round((
                    e.pageX - (
                    $(this).offset().left + options.padding + options.labelPadding)) / options.size) + options.startcol,
                        y = Math.round((
                        e.pageY - (
                        $(this).offset().top + options.padding + options.labelPadding)) / options.size) + options.startrow;
                    if (x < 1 || y < 1 || x > options.startcol + (options.cols - 1) || y > options.startrow + (options.rows - 1)) {
                        draw();
                    } else {
                        switch (tool) {
                        case tools.MOVE:
                            if (!onBoard(x, y)) {
                                stone(x, y, currentColor, false, false);
                                currentColor = !currentColor;
                                //options.sounds.click.currentTime = 0;
                                options.sounds.click.pause();
                                options.sounds.click.play();
                            }
                            break;
                        case tools.EDIT:
                            if (onBoard(x, y)) {
                                for (s in boardStones) {
                                    if (boardStones[s] && boardStones[s][0] == x && boardStones[s][1] == y) {
                                        boardStones[s] = null;
                                    }
                                }
                                draw();
                            } else {
                                if (e.ctrlKey) {
                                    stone(x, y, !currentColor, false, false);
                                } else {
                                    stone(x, y, currentColor, false, false);
                                }
                                draw();
                            }
                            break;
                        }
                    }
                });
                initialDraw();
            };

            var initialDraw = function() {
                var offsetX = options.padding + options.labelPadding,
                    offsetY = options.padding + options.labelPadding,
                    posX = options.padding + options.labelPadding,
                    posY = options.padding + options.labelPadding,
                    width = (options.cols - 1) * options.size,
                    height = (options.rows - 1) * options.size,
                    nRow = 1,
                    nCol = 1,
                    boardRows = [],
                    boardCols = [];

                options.canvas.width = width + (2 * offsetX) - options.labelPadding;
                options.canvas.height = height + (2 * offsetY) - options.labelPadding;

                $(options.canvas).parent().css({
                    width: options.canvas.width + options.controlsWidth + options.border.width,
                    height: options.canvas.height + options.commentsHeight + options.border.width,
                });
                $(options.canvas).css({
                    width: options.canvas.width,
                    height: options.canvas.height,
                    background: 'url(' + options.images.background.src + ')'
                });

                nRow = options.startrow;
                nCol = options.startcol;

                var sides = {
                    top: false,
                    left: false,
                    right: false,
                    bottom: false,
                };

                if (options.startrow == 1) {
                    sides.top = true;
                } else {
                    options.canvas.height += options.size;
                }
                if (options.startcol == 1) {
                    sides.left = true;
                } else {
                    options.canvas.width += options.size;
                }
                if (options.cols + (options.startcol - 1) == options.boardsize) {
                    sides.right = true;
                }
                if (options.rows + (options.startrow - 1) == options.boardsize) {
                    sides.bottom = true;
                }

                if (sides.top) {
                    options.canvas.drawLine(offsetX, posY, offsetX + width, posY);
                    boardRows[nRow] = {
                        y: posY,
                        name: options.boardsize
                    };
                    options.canvas.drawText(boardRows[nRow].name, options.labelPadding, posY);
                    posY += options.size;
                    nRow++;
                } else {
                    posY += options.size / 2;
                }

                if (!sides.left) {
                    width += options.size / 2;
                }
                var endRow = options.startrow + options.rows - 1;
                var endCol = options.startcol + options.cols - 1;

                for (; nRow <= endRow; nRow++) {
                    options.canvas.drawLine(offsetX, posY, offsetX + width, posY);
                    boardRows[nRow] = {
                        y: posY,
                        name: options.boardsize + 1 - nRow
                    };
                    options.canvas.drawText(boardRows[nRow].name, options.labelPadding, posY);
                    posY += options.size;
                }

                if (sides.left) {
                    options.canvas.drawLine(posX, offsetY, posX, offsetY + height);
                    boardCols[nCol] = {
                        x: posX,
                        name: 'A'
                    };
                    options.canvas.drawText(boardCols[nCol].name, posX, options.labelPadding);
                    posX += options.size;
                    nCol++;
                } else {
                    posX += options.size / 2;
                }

                if (!sides.top) {
                    height += options.size / 2;
                }

                for (; nCol <= endCol; nCol++) {
                    options.canvas.drawLine(posX, offsetY, posX, offsetY + height);
                    var char = 64 + nCol;
                    if (char >= 73 && options.boardsize < 52) char++;
                    if (char >= 91) char += 6;
                    if (char >= 105 && options.boardsize < 51) char++;
                    boardCols[nCol] = {
                        x: posX,
                        name: String.fromCharCode(char)
                    };
                    options.canvas.drawText(boardCols[nCol].name, posX, options.labelPadding);
                    posX += options.size;
                }

                for (row in boardRows) {
                    for (col in boardCols) {
                        if (!obj.board[row]) obj.board[row] = {};
                        obj.board[row][col] = {
                            x: boardCols[col].x,
                            y: boardRows[row].y,
                            name: boardCols[col].name + boardRows[row].name
                        };
                    }
                }

                for (n in options.stars) {
                    var x = options.stars[n][0],
                        y = options.stars[n][1];
                    if (obj.board[x] && obj.board[x][y]) {
                        options.canvas.drawCircle(obj.board[x][y].x, obj.board[x][y].y, 3);
                    }
                }
                obj.background = options.canvas.getContext('2d').getImageData(0, 0, options.canvas.width, options.canvas.height);
            };
            var draw = function() {
                options.canvas.getContext('2d').putImageData(obj.background, 0, 0);

                for (s in boardStones) {
                    if (!boardStones[s]) continue;
                    stone(boardStones[s][0], boardStones[s][1], boardStones[s][2], false, true);
                }
            };

            var stone = function(x, y, color, tentative, dontAdd) {
                var img = options.images.stones,
                    ctx = options.canvas.getContext('2d'),
                    offsetX = 0,
                    offsetY = 0;
                switch (color) {
                case true:
                case 1:
                case 'white':
                    offsetX = 30;
                    break;
                default:
                case false:
                case 0:
                case 'black':
                    break;
                }
                if (tentative) {
                    offsetY = 30;
                }
                if (!dontAdd) {
                    boardStones[boardStones.length] = [x, y, color];
                }
                ctx.drawImage(img, offsetX, offsetY, 30, 30, obj.board[x][y].y - options.size / 2, obj.board[x][y].x - options.size / 2, options.size, options.size);
            };
            build(where);
        };

        var SGFParser = function(sgf) {
            var data = sgf;
            var sgf = this;

            var properties = {
                charset: 'ISO-8859-1',
                /* CA */
                version: 1,
                /* FF */
                generator: '',
                /* AP */
                gameType: 1,
                /* GM */
                variations: 1,
                /* ST */
                boardsize: 19 /* SZ */
            };

            var gameInfo = {
                annotator: '',
                /* AN */
                ranks: {
                    black: '',
                    /* BR */
                    white: '' /* WR */
                },
                teamNames: {
                    black: '',
                    /* BT */
                    white: '' /* WT */
                },
                copyright: '',
                /* CP */
                date: '',
                /* DT */
                event: '',
                /* EV */
                name: '',
                /* GN */
                comments: '',
                /* GC */
                opening: '',
                /* ON */
                overtime: '',
                /* OT */
                playerNames: {
                    black: '',
                    /* PB */
                    white: '' /* PW */
                },
                place: '',
                /* PC */
                result: '',
                /* RE */
                round: '',
                /* RO */
                rules: '',
                /* RU */
                source: '',
                /* SO */
                timeLimit: '',
                /* TM */
                recorder: '',
                /* US */
            };
            var nodes;

            sgf.game = function() {
                return gameInfo;
            };
            sgf.properties = function() {
                return properties;
            };
            sgf.nodes = function() {
                return nodes;
            };
            sgf.setData = function(newData) {
                data = newData;
            };
            sgf.getData = function() {
                return data;
            };

            sgf.parse = function(p) {
                if (!p) {
                    p = data;
                }
                var n = {
                    nodes: [],
                    data: ''
                };
                var data = '';
                var x = 0;
                for (var i = 0; i < p.length; i++) {
                    var c = p.slice(i, i + 1);
                    switch (c) {
                    case '(':
                        i++;
                        var nodeData = '';
                        var paren = 1;
                        var stop = false;
                        while (c && !stop) {
                            c = p.slice(i, i + 1);
                            switch (c) {
                            case ')':
                                paren--;
                                if (!paren) {
                                    n.nodes[n.nodes.length] = sgf.parse(nodeData)
                                    stop = true;
                                    break;
                                }
                            default:
                                if (c == '(') paren++;
                                nodeData += c;
                            }
                            if (!stop) i++;
                        }
                        break;
                    case '[':
                    case ';':
                    default:
                        data += c;
                    }
                }
                if (data) {
                    n.data = data;
                }
                return n;
            };

            nodes = sgf.parse(data);
            return this;
        };

        var gbid = 0;
        var target = ($(this).length) ? this : document;

        if (!name) {
            name = 'JSGoban';
        }

        $(target).each(function() {
            if (this.nodeName.toLowerCase() == 'textarea') {
                return;
            }
            $(this).html(
            $(this).html().replace(
            new RegExp("{{{" + name + "\\[([^]*?)\\]}}}", 'g'), '<div class="jsgoban" id="jsgoban' + gbid + '">$1</div>'));
            gbid++;
        });
        return $('div.jsgoban[id^=jsgoban]', $(target)).each(function() {
            var $this = this;
            var board = new Board(options, this);
            board.load($(this).text());
            $(this).data('board', board);
        });
    });
})(jQuery);