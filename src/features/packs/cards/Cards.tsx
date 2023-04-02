import React from 'react';
import s from "../Packs.module.css";
import {PATH} from "../../../app/Path";
import {BackToRouteButton} from "../../components/BackToRouteButton/BackToRouteButton";

export const Cards = () => {
  /*useEffect(() => {
}, [])
*/
  return (
    <div>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <div className={s.componentContainer}>
        <div className={s.headContainer}>

        </div>

      </div>
    </div>

  );
};

