import React from 'react';
import { Link } from 'gatsby';
import withDrupalOauthConsumer from './drupal-oauth/withDrupalOauthConsumer';

import LogoutLink from './LogoutLink/LogoutLink';

function RedirectLoggedPacks(props) {
  return (
    <>
      {props.userAuthenticated ?<>
        <div className="button-seven">
          <Link to={`/user/buy/${props.pid}`}>{props.title}</Link>
        </div>
        </> :
        <div className="button-seven">
          <Link to="/user/login">{props.title}</Link>
        </div>}
      </>
  );
}

export default withDrupalOauthConsumer(RedirectLoggedPacks);
