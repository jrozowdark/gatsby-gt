import React from 'react';
import { Link } from 'gatsby';
import withDrupalOauthConsumer from './drupal-oauth/withDrupalOauthConsumer';

function RedirectLoggedPacks(props) {
  return (
    <>
      {props.userAuthenticated ?<>
        <div className="button-six">
          <Link to={`/user/buy/${props.pid}`}>{props.title}</Link>
        </div>
        </> :
        <div className="button-six">
          <Link to="/user/login">{props.title}</Link>
        </div>}
      </>
  );
}

export default withDrupalOauthConsumer(RedirectLoggedPacks);
