/**
 * @file
 * Tealium Manager javascript functionality.
 */
jQuery(document).ready(function(){
if(typeof Signup != 'undefined'){
    if(!Signup.track) {
        Signup.track = {};
    }
    Signup.track.globalTealium = new function () {
        this.url = 'vr-norest.localhost';
        this.setListener = function () {
            if ( typeof Signup.eventManager != 'undefined' ) {
                Signup.eventManager.addListener('CreateAccCp.Success', 'TrackingSignupEvents', this.sendSignUpEvent);
                Signup.eventManager.addListener('LoginCp.Success', 'TrackingSignupEvents', this.sendSignUpEvent);
                Signup.eventManager.addListener('ForgotPasswordCp.Success', 'TrackingSignupEvents', this.sendSignUpEvent);
            }
        }
        this.sendSignUpEvent = function(data){
            Signup.track.tlmObj.page_name = data.event;
            Signup.track.tlmObj.event_name = data.event;
            Signup.track.tlmObj.user = localStorage.getItem('ice_email');
            Signup.track.tlmObj.account_id = '';
            Signup.track.tlmObj.customer_number = '';
            Signup.track.tlmObj.event_category = 'authentication';
            Signup.track.tlmObj.event_action = data.event;
            Signup.track.tlmObj.event_label = 'Success';
            if (typeof window.utag != 'undefined') {
                utag.link(Signup.track.tlmObj);
            }
        }
    }
    Signup.track.globalTealium.setListener();
}});;
