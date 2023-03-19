/*  
 * Returns true if navigator has xr with 'immersive-ar' capabilities
 * Returns false otherwise.
 */
export function browserHasImmersiveArCompatibility() {
    return new Promise(async (resolve, reject) => {
        if (window.navigator.xr) {
            const isSupported = await navigator.xr.isSessionSupported(
                "immersive-ar",
            );
            console.info(
                `[DEBUG] ${isSupported
                    ? "Browser supports immersive-ar"
                    : "Browser does not support immersive-ar"
                }`,
            );
            resolve(isSupported);
        }
        resolve(false);
    })

}

export const isRunningOnMobileDevice = () => {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression
    containing some mobile devices keywords
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
        return true;
    } else {
        return false;
    }
}

export const getDeviceWidthAndHeight = () => {
    if(isRunningOnMobileDevice()){
        return {
            height: window.outerHeight,
            width: window.outerWidth
        }
    } else {
        return {
            height: window.innerHeight,
            width: window.innerWidth
        }
    }
}
/**
 * Create and show a simple introduction message if the device supports
 * WebXR with immersive-ar mode.
 */
export function displayIntroductionMessage() {
    const appRoot = document.getElementById("app-root");

    const bigMessage = document.createElement("h1");
    bigMessage.innerText = "Welcome! 👋";

    const middleMessage = document.createElement("p");
    middleMessage.innerText = "Press the button below to enter the AR experience.";

    const helpMessage = document.createElement("p");
    helpMessage.innerText =
        "Note: The app works best in a well lit environment, with enough space to move around.";

    helpMessage.style.fontSize = "16px";
    helpMessage.style.fontWeight = "bold";
    helpMessage.style.padding = "64px 64px 0px 64px";
    helpMessage.style.opacity = "0.8";

    if (appRoot) {
        appRoot.appendChild(bigMessage);
        appRoot.appendChild(middleMessage);
        appRoot.appendChild(helpMessage);
    }

    return () => {
        if (appRoot) {
            if (appRoot.contains(middleMessage)) {
                appRoot.removeChild(middleMessage);
            }
            if (appRoot.contains(bigMessage)) {
                appRoot.removeChild(bigMessage);
            }
            if (appRoot.contains(helpMessage)) {
                appRoot.removeChild(helpMessage);
            }
        }
    };
}
