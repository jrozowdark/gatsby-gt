class drupalOauth {
  /**
   *
   * @param config
   * - drupal_root:
   * - token_url:
   * - authorize_url:
   * - client_id:
   * - client_secret:
   */
  constructor(config) {
    this.config = config;
    this.config.token_url = `${this.config.drupal_root}/oauth/token`;
    this.config.user_url = `${this.config.drupal_root}/user/login?_format=json`;
    this.config.authorize_url = `${this.config.drupal_root}/oauth/authorize`;
    this.config.register_url = `${this.config.drupal_root}/user/register?_format=json`;
    this.config.register_update_url = `${this.config.drupal_root}/user/`;
    this.config.pack_user_url = `${this.config.drupal_root}/mp_transactions/getdatauser?_format=json`;
    this.config.purchase_order_url = `${this.config.drupal_root}/mp_purchase/order?_format=json`;
    this.config.redemption_url = `${this.config.drupal_root}/mp_purchase/redemption?_format=json`;
    this.config.recovery_url = `${this.config.drupal_root}/service/password/reset?_format=json`;
    this.config.change_pass_url = `${this.config.drupal_root}/service/user/reset?_format=json`;
  }

  /**
   * Check to see if the current user is logged in.
   *
   * If the user was previously logged in but their access token is expired
   * attempt to retrieve a new token.
   *
   * @returns <Mixed>
   *   The current users authorization token, or false.
   */
  isLoggedIn() {

    if (typeof window === 'undefined') {
      return false;
    }

    let token = localStorage.getItem('drupal-oauth-token') !== null ? JSON.parse(localStorage.getItem('drupal-oauth-token')) : null;

    if (token === null) {
      return false;
    }
    // If we've got an active token, assume the user is logged in.
    if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
      if (token.dump !== null){
        token.dump = decodeURIComponent(escape(atob(token.dump)));
      }
      return token;
    } else {
      // If not, see if we can get a refresh token.
      this.getRefreshToken(token, '').then((token) => {
        if (token !== null) {
          return token;
        }

        return false;
      })
    }
  };

  /**
   *
   */
  async handleLogin(username, password, scope) {
    return this.fetchUserId(username, password, scope);
  };

  /**
   * Log the current user out.
   *
   * Deletes the token from local storage.
   */
  async handleLogout() {
    localStorage.removeItem('bottles-enable');
    return localStorage.removeItem('drupal-oauth-token');
  };

  async getOauthToken(username, password, scope) {
    return this.fetchOauthToken(username, password, scope);
  };

  async getRefreshToken(token, scope) {
    return this.refreshOauthToken(token, scope);
  };
  /**
   *
   */
  async handleRegister(field_name, field_lastname, birthdate, username, modality, phone, password, scope) {
    return this.registerForm(field_name, field_lastname, birthdate, username, modality, phone, password, scope);
  };
  async handleUpdateRegister(field_name, field_lastname, birthdate, username, modality, phone, password, new_password) {
    return this.updateUserForm(field_name, field_lastname, birthdate, username, modality, phone, password, new_password);
  };
  async handlePackUser() {
    return this.packUser();
  };
  async handleData() {
    return  Promise.resolve(this.isLoggedIn());
  };
  async handleSendOrder(sendData){
    return this.getUrlOrder(sendData);
  }
  async handleSendRedemption(sendData) {
    return this.setRedemption(sendData);
  }
  async handleRecoveryPassword(email){
    return this.setRecoveryPassword(email);
  }
  async handleChangePassword(id, time, hash,pass) {
    return this.setChangePassword(id, time, hash,pass)
  }
  /**
   * Get an OAuth token from Drupal.
   *
   * Exchange a username and password for an OAuth token.
   * @param username
   * @param password
   * @param scope
   * @returns {Promise<void>}
   *   Returns a promise that resolves with the new token returned from Drupal.
   */
  async fetchOauthToken(username, password, scope) {
    let formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', this.config.client_id);
    formData.append('client_secret', this.config.client_secret);
    formData.append('scope', this.config.scope);
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(this.config.token_url, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
    }).then(response => response.json())
    .then(json => {
      //throw new Error(text.message);
      if (json.error) {
        throw new Error(json.message);
      }else{
        return this.storeToken(json);
      }
    }).catch(err => {
      throw new Error(err);
    });
    return response;
    // if (response.ok) {
    //   const json = await response.json();

    //   if (json.error) {
    //     throw new Error(json.error.message);
    //   }

    //   return this.storeToken(json);
    // }
  };
/**
   * Get an OAuth token from Drupal.
   *
   * Exchange a username and password for an OAuth token.
   * @param username
   * @param password
   * @param scope
   * @returns {Promise<void>}
   *   Returns a promise that resolves with the new token returned from Drupal.
   */
  async fetchUserId(username, password, scope) {

    const response = await fetch(this.config.user_url, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: JSON.stringify({"name" : username, "pass": password }),
    }).then(response => response.json())
    .then(json => {
      if (json.message) {
        if (json.message.includes('IP')){
          json.message = "Se ha bloquedo tú cuenta por cantidad de intentos";
        }else if(json.message.includes('activated')){
          json.message = "Tú usuario no ha sido activado por favor revisa tú correo";
        }else{
          json.message = "Usuario o contraseña incorrectos";
        }
        return json;
      }else{
        this.storeUid(json.current_user);
        return true;
      }
    }).catch(err => {
      return {"message":err};
    });

    if(response === true){
      return await this.fetchOauthToken(username, password, scope);
    }
    return response;
  };
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   * @param scope
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
  async refreshOauthToken(token, scope) {
    if (token !== null && token !== undefined) {
      let formData = new FormData();
      formData.append('grant_type', 'refresh_token');
      formData.append('client_id', this.config.client_id);
      formData.append('client_secret', this.config.client_secret);
      formData.append('scope', scope);
      formData.append('refresh_token', token.refresh_token);

      const response = await fetch(this.config.token_url, {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
        }),
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          return null;
        }

        return this.storeToken(json);
      }

      return null;
    }
  };

  storeToken(json) {
    let store = localStorage.getItem('drupal-oauth-token') !== null ? JSON.parse(localStorage.getItem('drupal-oauth-token')) : null;
    let token = Object.assign({}, json);
    token.date = Math.floor(Date.now() / 1000);
    token.expirationDate = token.date + token.expires_in;
    token.dump = store !== null ? store.dump : "";
    localStorage.setItem('drupal-oauth-token', JSON.stringify(token));
    return token;
  }

  storeUid(json) {
    let token = localStorage.getItem('drupal-oauth-token') !== null ? JSON.parse(localStorage.getItem('drupal-oauth-token')) : null;
    let data = Object.assign({}, token);
    data.dump = this.Estring(json.uid);
    localStorage.setItem('drupal-oauth-token', JSON.stringify(data));
    return token;
  }

  Estring(str) {
    return btoa(unescape(encodeURIComponent(str)))
  }
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   * @param scope
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
   async registerForm(field_name, field_lastname, birthdate, username, modality, phone, password, scope) {

      const response = await fetch(this.config.register_url, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        body: JSON.stringify({
          "name": [{
            "value": username
          }],
          "mail": [{
            "value": username
          }],
          "pass": [{
            "value": password
          }],
          "field_lastname": [{
            "value": field_lastname
          }],
          "field_name": [{
            "value": field_name
          }],
          "field_role": [{
            "value": scope
          }],
          "field_bike_type": [{
            "value": modality
          }],
          "field_phone": [{
            "value": phone
          }],
          "field_born_date": [{
            "value": birthdate
          }]
        }),
      }).then(response => response.json())
        .then(json => {
          //throw new Error(text.message);
          if (json.message) {
            throw new Error(json.message);
          } else {
            return this.handleLogin(username, password, scope);
            // return this.storeToken(json);
          }
        }).catch(err => {
          throw new Error(err);
        });
  };
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   * @param scope
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
   async updateUserForm(field_name, field_lastname, birthdate, username, modality, phone, password, new_password) {
     var data = {
       'field_name': field_name,
       'field_lastname': field_lastname,
       'field_bike_type': modality,
       'field_phone': phone,
       "pass": {"existing":password,"value": new_password}
     };
     Object.keys(data).forEach(key => (data[key] === undefined || data[key] === '') && delete data[key])
     Object.keys(data).forEach(key => {
      data[key] = {"value":data[key]}
     })
      const token = this.isLoggedIn();
      const response = await fetch(`${this.config.register_update_url}${token.dump}?_format=json`, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${token.token_type} ${token.access_token}`
        }),
        body: JSON.stringify(data)
      }).then(response => response.json())
        .then(json => {
          //throw new Error(text.message);
          if (json.error) {
            throw new Error(json.message);
          } else {
            this.handleLogout();
            return true;
            // return this.handleLogin(username, password, scope);
            // return this.storeToken(json);
          }
        }).catch(err => {
          throw new Error(err);
        });
  };
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
   async getUrlOrder(senData) {
    const token = this.isLoggedIn();
    if (token != undefined) {
      const service = await fetch(this.config.purchase_order_url, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token.token_type} ${token.access_token}`
          }),
          body: senData
        });
        if (service.ok) {
          const json = await service.json();

          if (json.error) {
            return null;
          }

          return json.id_mp;
        }

        return null;
    }
  };
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
   async setRedemption(senData) {
    const token = this.isLoggedIn();
    if (token != undefined) {
      const service = await fetch(this.config.redemption_url, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token.token_type} ${token.access_token}`
          }),
          body: senData
        });
        if (service.ok) {
          const json = await service.json();

          if (json.message) {
            return json;
          }

          return '/thanks-redemption';
        }

        return null;
    }

  };
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
  async setRecoveryPassword(email) {
    const service = await fetch(this.config.recovery_url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({"mail":{"value":email}})
    });
    if (service.ok) {
      const json = await service.json();

      if (json.message) {
        return json;
      }

      return true;
    }

    return null;
  }
  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
  async setChangePassword(id, time, hash,pass) {
    const service = await fetch(this.config.change_pass_url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "uid" : {"value":id},
        "timestamp" : {"value":time},
        "hash" : {"value":hash},
        "pass": {"value":pass}
      })
    }).then(response => response.json())
      .then(json => {
        //throw new Error(text.message);
        if (json.message) {
          if (json.message.includes('Reset request is no longer valid')) {
            json.message = "Ya usaste este intento intenta solicitarla nuevamente";
          }
          return json;
        } else {
          return true;
        }
      }).catch(err => {
        return {
          "message": err
        };
      });
    return service;
    if (service.ok) {
      const json = await service.json();

      if (json.message) {
        return json;
      }

      return true;
    }

    return null;
  }
//   {
// "uid" : {"value":6},
// "timestamp" : {"value":1624432609},
// "hash" : {"value":"cOyM0a6SDyW054tv6ZylpbpyIYippk8jnHKFg6il5TI"},
// "pass": {"value":"master"}
// }
}

export default drupalOauth;
