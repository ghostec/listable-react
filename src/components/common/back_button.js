import React from 'react';

import { history } from 'history';

export default () => <img src="/images/back.svg" onClick={() => history.goBack()} />;
