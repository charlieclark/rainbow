( function () {

    var numRange = 100;

    //RAINBOW CLASS
    function Rainbow( spectrum ) {

        this._gradients = null;
        this._colors = null;
        this.setColors( spectrum );
    }

    Rainbow.prototype = {

        setColors: function ( spectrum ) {

            var increment = this._segmentLength = numRange / ( spectrum.length - 1 );

            this._gradients = [];

            for ( var i = 0; i < spectrum.length - 1; i++ ) {
                var colorGradient = new ColorGradient(
                    spectrum[ i ],
                    spectrum[ i + 1 ],
                    increment * i,
                    increment * ( i + 1 )
                );
                this._gradients[ i ] = colorGradient;
            }

            this._colors = spectrum;

        },

        colorAt: function ( ratio, inRgb ) {

            var number = ratio * numRange;
            var index = Math.min( Math.floor( number / this._segmentLength ), this._gradients.length - 1 );
            return this._gradients[ index ].colorAt( number, inRgb );
        }
    }

    //COLOR GRADIENT CLASS
    function ColorGradient( colorStart, colorEnd, minNumber, maxNumber ) {

        this._startColor = getHexColor( colorStart );
        this._endColor = getHexColor( colorEnd );
        this._minNumber = minNumber;
        this._maxNumber = maxNumber;
    }

    ColorGradient.prototype = {

        colorAt: function ( number, inRgb ) {

            var r = this.calcInt( number, this._startColor.substring( 0, 2 ), this._endColor.substring( 0, 2 ) );
            var g = this.calcInt( number, this._startColor.substring( 2, 4 ), this._endColor.substring( 2, 4 ) );
            var b = this.calcInt( number, this._startColor.substring( 4, 6 ), this._endColor.substring( 4, 6 ) );

            if ( inRgb === true ) {
                return [ r, g, b ];
            } else {
                return calcHex( r ) + calcHex( g ) + calcHex( b );
            }

        },

        calcInt: function ( number, channelStart_Base16, channelEnd_Base16 ) {

            var num = Math.min( Math.max( number, this._minNumber ), this._maxNumber );
            var numRange = this._maxNumber - this._minNumber;

            var cStart_Base10 = parseInt( channelStart_Base16, 16 );
            var cEnd_Base10 = parseInt( channelEnd_Base16, 16 );
            var cPerUnit = ( cEnd_Base10 - cStart_Base10 ) / numRange;
            var c_Base10 = Math.round( cPerUnit * ( num - this._minNumber ) + cStart_Base10 );

            return c_Base10;
        }
    }

    //UTILS
    function calcHex( integer ) {
        return formatHex( integer.toString( 16 ) );
    }

    function formatHex( hex ) {
        return ( hex.length === 1 ) ? '0' + hex : hex;
    }

    function getHexColor( string ) {
        return string.substring( string.length - 6, string.length );
    }

    //EXPORTING as global var in browser of as export in node
    var root = this;
    if ( typeof exports !== 'undefined' ) {
        if ( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = Rainbow;
        }
        exports.Rainbow = Rainbow;
    } else {
        root.Rainbow = Rainbow;
    }
} )();
