import React from "react";
import {PackTable} from "./packTable/PacksTable";
import {PacksFilterPanel} from "./packsFilterPanel/PacksFilterPanel";

import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {Container} from "../../components/container/Container";
import {usePacksFetch} from "./hooks/usePacksFetch";


export const Packs = () => {

  const isLoading = useAppIsLoading()

  usePacksFetch()

  return (
      <Container>
        <SubHeaderTable
          isLoading={isLoading}
          title={'Pack list'}
          titleButton={'Add pack'}
          onClick={() => console.log("Click")}
        />
        <PacksFilterPanel/>
        <PackTable/>
      </Container>
  )
}