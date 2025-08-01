<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}"<#if realm.internationalizationEnabled && locale?? && locale.currentLanguageTag??> lang="${locale.currentLanguageTag}"</#if>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if authenticationSession??>
        <script type="module">
            import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";

            checkCookiesAndSetTimer(
              "${authenticationSession.authSessionId}",
              "${authenticationSession.tabId}",
              "${url.ssoLoginInOtherTabsUrl}"
            );
        </script>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
<div class="${properties.kcLoginClass!}">
    <div id="kc-header" class="${properties.kcHeaderClass!}">
        <div id="kc-header-wrapper"
             class="${properties.kcHeaderWrapperClass!}">${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}</div>
    </div>
    <div class="${properties.kcFormCardClass!}">
        <header class="${properties.kcFormHeaderClass!}">
            <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                <div class="${properties.kcLocaleMainClass!}" id="kc-locale">
                    <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                        <div id="kc-locale-dropdown" class="${properties.kcLocaleDropDownClass!}">
                            <a href="#" id="kc-current-locale-link">${locale.current}</a>
                            <ul class="${properties.kcLocaleListClass!}">
                                <#list locale.supported as l>
                                    <li class="${properties.kcLocaleListItemClass!}">
                                        <a class="${properties.kcLocaleItemClass!}" href="${l.url}">${l.label}</a>
                                    </li>
                                </#list>
                            </ul>
                        </div>
                    </div>
                </div>
            </#if>
        <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
            <#if displayRequiredFields>
                <div class="${properties.kcContentWrapperClass!}">
                    <div class="${properties.kcLabelWrapperClass!} subtitle">
                        <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                    </div>
                    <div class="col-md-10">
                        <h1 id="kc-page-title"><#nested "header"></h1>
                    </div>
                </div>
            <#else>
                <h1 id="kc-page-title"><#nested "header"></h1>
            </#if>
        <#else>
            <#if displayRequiredFields>
                <div class="${properties.kcContentWrapperClass!}">
                    <div class="${properties.kcLabelWrapperClass!} subtitle">
                        <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                    </div>
                    <div class="col-md-10">
                        <#nested "show-username">
                        <div id="kc-username" class="${properties.kcFormGroupClass!}">
                            <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                            <a id="reset-login" href="${url.loginRestartFlowUrl}" aria-label="${msg("restartLoginTooltip")}">
                                <div class="kc-login-tooltip">
                                    <i class="${properties.kcResetFlowIcon!}"></i>
                                    <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            <#else>
                <#nested "show-username">
                <div id="kc-username" class="${properties.kcFormGroupClass!}">
                    <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                    <a id="reset-login" href="${url.loginRestartFlowUrl}" aria-label="${msg("restartLoginTooltip")}">
                        <div class="kc-login-tooltip">
                            <i class="${properties.kcResetFlowIcon!}"></i>
                            <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                        </div>
                    </a>
                </div>
            </#if>
        </#if>
      </header>
      <div id="kc-content">
        <div id="kc-content-wrapper">

          <#-- App-initiated actions should not see warning messages about the need to complete the action -->
          <#-- during login.                                                                               -->
          <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
              <div class="alert-${message.type} ${properties.kcAlertClass!} pf-m-<#if message.type = 'error'>danger<#else>${message.type}</#if>">
                  <div class="pf-c-alert__icon">
                      <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                      <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                      <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                      <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                  </div>
                      <span class="${properties.kcAlertTitleClass!}">${kcSanitize(message.summary)?no_esc}</span>
              </div>
          </#if>

          <#nested "form">

          <#if auth?has_content && auth.showTryAnotherWayLink()>
              <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post">
                  <div class="${properties.kcFormGroupClass!}">
                      <input type="hidden" name="tryAnotherWay" value="on"/>
                      <a href="#" id="try-another-way"
                         onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                  </div>
              </form>
          </#if>

          <#nested "socialProviders">

          <#if displayInfo>
              <div id="kc-info" class="${properties.kcSignUpClass!}">
                  <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                      <#nested "info">
                  </div>
              </div>
          </#if>
        </div>
      </div>

    </div>
  </div>
  <script>
  (function () {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get("lang") || "en";

    localStorage.setItem("lang", lang);

    var redirectUrl = params.get("redirectTo");

    if (redirectUrl) {
      var redirect = new URL(redirectUrl);
      redirect.searchParams.set("kc_locale", lang);

      window.location.href = redirect.toString();
    }
  })();
</script>

  <script>
  (function() {
    var lang = "${locale.currentLanguageTag}";
    if (lang) {
      localStorage.setItem('lang', lang);
    }
  })();
</script>
<script>
  (function () {
    const hostname = window.location.hostname;

    const isStage =
      hostname.includes("stage") ||
      hostname.includes("local");

    const clarityId = isStage
      ? "sks5r44u0z" 
      : "sl0ebc8odl"; 

    const piwikId = isStage
      ? "3e5fc57f-6d22-4ad0-a1fd-6bd4cd47e200" 
      : "90225fa8-6ec7-4978-8dc4-c7684b977a40";

    // -------- Microsoft Clarity --------
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q ?? []).push(arguments);
      };
      const scriptElement = l.createElement(r);
      scriptElement.async = 1;
      scriptElement.src = "https://www.clarity.ms/tag/" + i;
      const firstScriptElement = l.getElementsByTagName(r)[0];
      firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
      window.clarity("consent");
    })(window, document, "clarity", "script", clarityId);

    // -------- Piwik Pro --------
    (function (window, document, dataLayerName, id) {
      window[dataLayerName] = window[dataLayerName] || [];
      window[dataLayerName].push({
        start: new Date().getTime(),
        event: "stg.start"
      });

      const firstScript = document.getElementsByTagName("script")[0];
      const tagScript = document.createElement("script");
      const queryParams = [];

      if (dataLayerName !== "dataLayer") {
        queryParams.push("data_layer_name=" + dataLayerName);
      }

      const queryString = queryParams.length > 0 ? "?" + queryParams.join("&") : "";
      tagScript.async = true;
      tagScript.src = "https://flickit.containers.piwik.pro/" + id + ".js" + queryString;
      firstScript.parentNode.insertBefore(tagScript, firstScript);

      (function (context, namespace, modules) {
        context[namespace] = context[namespace] || {};
        for (let i = 0; i < modules.length; i++) {
          const moduleName = modules[i];
          context[namespace][moduleName] = context[namespace][moduleName] || {};
          context[namespace][moduleName].api = context[namespace][moduleName].api || function () {
            const args = [].slice.call(arguments, 0);
            if (typeof args[0] === "string") {
              window[dataLayerName].push({
                event: namespace + "." + moduleName + ":" + args[0],
                parameters: args.slice(1)
              });
            }
          };
        }
      })(window, "ppms", ["tm", "cm"]);
    })(window, document, "dataLayer", piwikId);
  })();
</script>

<script>
  const handleButtonClick = (label) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "ppms.cm:trackEvent",
        parameters: {
          category: "Button",
          action: "Click",
          name: label,
        },
      });
    }

    if (window.clarity) {
      clarity("set", "login_click", label);
    }
  };

  const loginBtn = document.querySelector("#kc-login");
  if (loginBtn) loginBtn.onclick = () => handleButtonClick("Login Button");

  const googleBtn = document.querySelector("#social-google");
  if (googleBtn) googleBtn.onclick = () => handleButtonClick("Login with Google");

  const githubBtn = document.querySelector("#social-github");
  if (githubBtn) githubBtn.onclick = () => handleButtonClick("Login with GitHub");

  const registerLink = document.querySelector('#kc-registration a');
  if (registerLink) registerLink.onclick = () => handleButtonClick("Register Link");

  const forgotLink = document.querySelector('a[href*="reset-credentials"]');
  if (forgotLink) forgotLink.onclick = () => handleButtonClick("Forgot Password Link");

  const registerButton = document.querySelector('#kc-register-form input[type="submit"]');
  if (registerButton) registerButton.onclick = () => handleButtonClick("Register Submit Button");

  const backToLoginLink = document.querySelector('#kc-form-options a[href*="authenticate"]');
  if (backToLoginLink) backToLoginLink.onclick = () => handleButtonClick("Back to Login Link");

  const resetPasswordForm = document.querySelector("#kc-reset-password-form");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", () => handleButtonClick("Reset Password Submit"));
  }
</script>


</body>
</html>
</#macro>
