/**
 * Singleton that holds configurations for PseudoEasing paths.
 * @private
 * @class Ext.fx.PseudoEasing
 * PseudoEasing combines multiple cubic-bezier curves and creates an Ext.fx.Animation to achieve more complex effects.
 * <h2>Extended Pseudo Easing Values:</h2>
 * <div class="mdetail-params"><ul>
 * <li><b><tt>back-in</tt></b></li>
 * <li><b><tt>back-out</tt></b></li>
 * <li><b><tt>bounce-in</tt></b></li>
 * <li><b><tt>bounce-out</tt></b></li>
 * <li><b><tt>elastic-in</tt></b></li>
 * <li><b><tt>elastic-out</tt></b></li>
 * </ul></div>
 * @singleton
 */

Ext.define('Ext.fx.PseudoEasing', {

    /* Begin Definitions */

    singleton: true,

    /* End Definitions */

    'back-in': {
        isPseudoEasing: true,
        '40%': {
            easing: 'ease-in-out',
            damper: -0.1
        },
        '100%': {
            easing: 'ease-in',
            damper: 1.1
        }
    },
    'back-out': {
        isPseudoEasing: true,
        '60%': {
            easing: 'ease-out',
            damper: 1.1
        },
        '100%': {
            easing: 'ease-in-out',
            damper: -0.1
        }
    },
    'bounce-out': {
        isPseudoEasing: true,
        '36%': {
            easing: 'ease-in',
            damper: 1
        },
        '54%': {
            easing: 'ease-out',
            damper: -0.25
        },
        '72%': {
            easing: 'ease-in',
            damper: 0.25
        },
        '81%': {
            easing: 'ease-out',
            damper: -0.0625
        },
        '90%': {
            easing: 'ease-in',
            damper: 0.0625
        },
        '95%': {
            easing: 'ease-out',
            damper: -0.015
        },
        '100%': {
            easing: 'ease-in',
            damper: 0.015
        }
    },
    'bounce-in': {
        isPseudoEasing: true,
        '5%': {
            easing: 'ease-in',
            damper: 0.015
        },
        '10%': {
            easing: 'ease-out',
            damper: -0.015
        },
        '19%': {
            easing: 'ease-in',
            damper: 0.0625
        },
        '28%': {
            easing: 'ease-out',
            damper: -0.0625
        },
        '46%': {
            easing: 'ease-in',
            damper: 0.25
        },
        '64%': {
            easing: 'ease-out',
            damper: -0.25
        },
        '100%': {
            easing: 'ease-in',
            damper: 1
        }
    },
    'elastic-in': {
        isPseudoEasing: true,
        '14%': {
            easing: 'ease-in',
            damper: 0.005
        },
        '29%': {
            easing: 'ease-in-out',
            damper: -0.015
        },
        '43%': {
            easing: 'ease-in-out',
            damper: 0.025
        },
        '57%': {
            easing: 'ease-in-out',
            damper: -0.065
        },
        '71%': {
            easing: 'ease-in-out',
            damper: 0.19
        },
        '86%': {
            easing: 'ease-in-out',
            damper: -0.51
        },
        '100%': {
            easing: 'ease-out',
            damper: 1.37
        }
    },
    'elastic-out': {
        isPseudoEasing: true,
        '14%': {
            easing: 'ease-in',
            damper: 1.37
        },
        '29%': {
            easing: 'ease-in-out',
            damper: -0.51
        },
        '43%': {
            easing: 'ease-in-out',
            damper: 0.19
        },
        '57%': {
            easing: 'ease-in-out',
            damper: -0.065
        },
        '71%': {
            easing: 'ease-in-out',
            damper: 0.025
        },
        '86%': {
            easing: 'ease-in-out',
            damper: -0.015
        },
        '100%': {
            easing: 'ease-out',
            damper: 0.005
        }
    }
});