import { provideTransloco } from '@jsverse/transloco';
import { LanguageHttpLoader } from './language-loader';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGE } from './language.constant';
import { isDevMode } from '@angular/core';

export const provideMultipleLanguage = () => {
    return provideTransloco({
        config: {
            availableLangs: SUPPORTED_LANGUAGE,
            defaultLang: DEFAULT_LANGUAGE,
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
            fallbackLang: DEFAULT_LANGUAGE
        },
        loader: LanguageHttpLoader,
    })
}