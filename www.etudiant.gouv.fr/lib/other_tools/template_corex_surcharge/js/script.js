/**
 * Created by jdenys on 04/11/16.
 */

//ticket:347456 -> Annuler le keypress de corex pour la remontée haut de page.
jQuery('#totop').unbind('keypress');

jQuery('#totop').keyup(function (event) {
    event.preventDefault();
    var duration = 500;
    var key = event.which;
    if(key == '13'){
        jQuery('html, body').animate({ scrollTop: 0 }, duration, function() {
            jQuery("body a:first").focus();
        });
        return false;
    }
});
