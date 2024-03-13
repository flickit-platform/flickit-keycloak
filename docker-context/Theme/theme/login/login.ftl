<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section == "header">
        ${msg("loginAccountTitle")}
    <#elseif section == "form">
        <div id="kc-form">
            <div id="kc-form-wrapper">
                <#if realm.password>
                    <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                        <div class="${properties.kcFormGroupClass!} logo__container">
                            <img class="logo" src="./resources/img/Logo.svg" alt="logo" />
                        </div>
                        <div class="${properties.kcFormGroupClass!} content__container">
                            <p class="welcome__text">Welcome to Flickit</p>
                            <div class="form__container">
                                <div class="input__container">
                                    <label>Email</label>
                                    <input tabindex="1" id="username" class="${properties.kcInputClass!} login__input" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off"
                                           aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
                                    <#if messagesPerField.existsError('username','password')>
                                        <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                            ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                                        </span>
                                    </#if>
                                </div>
                                <div class="input__container">
                                    <label>Password</label>
                                    <input tabindex="2" id="password" class="${properties.kcInputClass!} login__input" name="password" type="password" autocomplete="off"
                                           aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
                                    <#if usernameHidden?? && messagesPerField.existsError('username','password')>
                                        <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                            ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                                        </span>
                                    </#if>
                                </div>
                                <div class="btn__container">
                                    <span>Forgot your password?</span>
                                    <input tabindex="3" class="${properties.kcButtonClass!} submit__btn" type="submit" value="${msg("doLogIn")}"/>
                                </div>
                            </div>
                            <div class="continue__txt">or continue with your accounts in</div>
                            <div class="social__container">
                                <div>1</div>
                                <div>2</div>
                            </div>
                        </div>
                    </form>
                </#if>
            </div>
        </div>
    <#elseif section == "info">
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    <#elseif section == "socialProviders">
        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <hr/>
                <h4>${msg("identity-provider-login-label")}</h4>
                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                    <#list social.providers as p>
                        <li>
                            <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                    type="button" href="${p.loginUrl}">
                                <#if p.iconClasses?has_content>
                                    <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                    <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                                <#else>
                                    <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                                </#if>
                            </a>
                        </li>
                    </#list>
                </ul>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>
