import React, { useState } from "react";
import {  Dropdown, DropdownButton, Table } from "react-bootstrap";
import { CouponsModel } from "../../../Models/Coupons";
import CouponItem from "../CouponItem/CouponItem";
import "./CouponTable.css";

interface CouponTableProps {
  couponsCompany: CouponsModel[];
  setCouponsCompany: React.Dispatch<React.SetStateAction<CouponsModel[]>>;
}


function CouponTable(props: CouponTableProps): JSX.Element {
  let [couponsCompany, setCouponsCompany] = useState<CouponsModel[]>(
    props.couponsCompany
  );
  const [price, setPrice] = useState<number>(0);
  const [select, setSelect] = useState<String>("All")

  const handleInput = (e: any) => {
    setPrice(e.target.value);
  }
     
  const handleSelect = (e: any) => {
    let filtered = props.couponsCompany;
    if( e !== 'All') {
      filtered = props.couponsCompany.filter((c) => {
        return c.category === e;
      });
      } 
    setSelect(e);
    setCouponsCompany(filtered);
  };


    return (
      <div className="CouponTable">
        <div className="my-4  d-flex justify-content-center g-4">
          <DropdownButton
            id="dropdown-basic-button"
            title={"Category: " + select}
            variant="primary"
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey={"All"}>All</Dropdown.Item>
            <Dropdown.Item eventKey={"Food"}>Food</Dropdown.Item>
            <Dropdown.Item eventKey={"Beverages"}>Beverages</Dropdown.Item>
            <Dropdown.Item eventKey={"Desserts"}>Desserts</Dropdown.Item>
          </DropdownButton>
          <div className=" d-flex justify-content-center">
            <h3 className="mx-3">Max Price: {price}</h3>
            <input type="range" max={100} onInput={handleInput} />
          </div>
        </div>
        {(select === "All" ? props.couponsCompany : couponsCompany).length >
        0 ? (
          <div className="Table pt-2">
            <Table striped bordered hover>
              <thead>
                <th>Category</th>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Prise</th>
                <th>Amount</th>
                <th>Image</th>
                <th></th>
                <th></th>
              </thead>
              <tbody>
                {(select === "All" ? props.couponsCompany : couponsCompany)
                  .filter((c) => {
                    return c.price! > price;
                  })
                  .map((c) => {
                    return (
                      <CouponItem
                        key={c.id}
                        couponsCompany={c}
                        setCouponsCompany={setCouponsCompany}
                      />
                    );
                  })}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3 className="text-center mt-4 text-muted"> No coupons for you!</h3>
        )}
      </div>
    );
}

export default CouponTable;
