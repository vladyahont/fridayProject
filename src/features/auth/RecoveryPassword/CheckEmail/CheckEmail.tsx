import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../app/Path";

export const CheckEmail = () => {
  return (
    <div>
      <NavLink to={PATH.LOGIN}>
        To lоgin
      </NavLink>
    </div>
  );
};

