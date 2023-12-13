import React from 'react'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import {FormattedMessage, injectIntl} from 'react-intl'
import langSelectImg from '../../img/lang-select.png'

const onClickTranslateHelp = () => {
  window.location.href =
    'https://github.com/pi-apps/pi-explorer/tree/master/src/languages'
}

const styleLanguageSelector = {
  backgroundColor: 'rgba(255, 0, 0, 0)',
  border: 0,
  padding: 0,
}

const LanguageSelector = ({
  selectedLanguage,
  switcher,
  intl: {formatMessage},
}) => (
  <Dropdown id="Language-Selector">
    <Dropdown.Toggle style={styleLanguageSelector}>
      <img
        src={langSelectImg}
        style={{height: 35, width: 28}}
        alt={formatMessage({id: 'language.selector'})}
      />
    </Dropdown.Toggle>
    <Dropdown.Menu style={{color: 'white'}}>
      <MenuItem lang="en" onClick={switcher}>
        English
      </MenuItem>
      <MenuItem lang="zh-Hans" onClick={switcher}>
        中文 (简体)
      </MenuItem>
      <MenuItem lang="zh-Hant" onClick={switcher}>
        中文 (繁體)
      </MenuItem>
      <MenuItem lang="ru" onClick={switcher}>
        Pусский
      </MenuItem>
      <MenuItem lang="vi" onClick={switcher}>
        Tiếng Việt
      </MenuItem>
      <MenuItem lang="fr" onClick={switcher}>
        Français
      </MenuItem>
      <MenuItem lang="ur" onClick={switcher}>
        اردو
      </MenuItem>
      <MenuItem lang="hi" onClick={switcher}>
        हिन्दी
      </MenuItem>
      <MenuItem lang="ja" onClick={switcher}>
        日本語
      </MenuItem>
      <MenuItem lang="id" onClick={switcher}>
        Bahasa Indonesia
      </MenuItem>
      <MenuItem lang="ha" onClick={switcher}>
        Hausa
      </MenuItem>
      <MenuItem lang="it" onClick={switcher}>
        Italiana
      </MenuItem>
      <MenuItem lang="ne" onClick={switcher}>
        नेपाली
      </MenuItem>
      <MenuItem lang="pt" onClick={switcher}>
        Português
      </MenuItem>
      <MenuItem
        onClick={onClickTranslateHelp}
        style={{borderTop: '1px solid black'}}
      >
        <FormattedMessage id="translate.help" />
      </MenuItem>
    </Dropdown.Menu>
  </Dropdown>
)

export default injectIntl(LanguageSelector)
