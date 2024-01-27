'use client';

import { Navbar, NavbarContent, Select, SelectItem } from "@nextui-org/react";

type SubHeaderProps = {
  modeledByList: string[];
  annotatedByList: string[];
  handleModelerSelect: (modeler: string | undefined) => void;
  handleAnnotatorSelect: (annotator: string | undefined) => void;
};

const SubHeader = (props: SubHeaderProps) => {

  const modeledByList: string[] = props.modeledByList;
  const annotatedByList: string[] = props.annotatedByList;

  const handleModeledBySelectionChange = (selectionSet: any) => {
    const namesArray: string[] | undefined = Array.from(selectionSet);
    const name: string | undefined = namesArray[0];
    props.handleModelerSelect(name);
  };

  const handleAnnotatedBySelectionChange = (selectionSet: any) => {
    const namesArray: string[] | undefined = Array.from(selectionSet);
    const name: string | undefined = namesArray[0];
    props.handleAnnotatorSelect(name);
  };

  return (
    <Navbar isBordered className="z-0 w-full bg-[#00856A] dark:bg-[#212121]">
      <NavbarContent>
        <div className="flex w-full gap-4 justify-center lg:justify-end">
          <Select
            size="sm"
            label="Modeled By"
            className="w-[47.5%] lg:w-[25%]"
            classNames={{
              mainWrapper: "h-10",
            }}
            onSelectionChange={handleModeledBySelectionChange}
          >
            {modeledByList.map((modeler: string, index: number) => (
              <SelectItem key={modeler} value={modeler} >
                {modeler}
              </SelectItem>
            ))}
          </Select>
          <Select
            size="sm"
            label="Annotated By"
            className="w-[47.5%] lg:w-[25%] "
            classNames={{
              mainWrapper: "h-10",
            }}
            onSelectionChange={handleAnnotatedBySelectionChange}
          >
            {annotatedByList.map((modeler: string, index: number) => (
              <SelectItem key={modeler} value={modeler} >
                {modeler}
              </SelectItem>
            ))}
          </Select>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default SubHeader;