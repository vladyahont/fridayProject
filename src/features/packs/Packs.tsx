import React from "react";
import {PackTable} from "./packTable/PacksTable";
import {PacksFilter} from "./filterComponents/PacksFillter";
import {usePacksFetch} from "./usePacksFetch";
import {SubHeaderTable} from "../components/subHeaderTable/SubHeaderTable";
import {useAppIsLoading} from "../../hooks/useAppIsLoading";

export const Packs = () => {

    const isLoading = useAppIsLoading()
    usePacksFetch()

    return (
        <>
          <SubHeaderTable
            isLoading={isLoading}
            title={'Pack list'}
            titleButton={'Add pack'}
            onClick={()=> console.log("Click")}
          />
            <PacksFilter />
            <PackTable />
        </>
    )
}