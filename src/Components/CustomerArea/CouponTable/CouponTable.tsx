import { useState } from "react";
import {  Dropdown, DropdownButton, Table } from "react-bootstrap";
import { CouponsModel } from "../../../Models/Coupons";
import CouponItem from "../CouponItem/CouponItem";
import "./CouponTable.css";

interface CouponTableProps {
    coupons : CouponsModel[];
}


function CouponTable(props: CouponTableProps): JSX.Element {
  let [coupons, setCoupons] = useState<CouponsModel[]>(props.coupons);
  const [price, setPrice] = useState<number>(0);
  const [select, setSelect] = useState<String>("All")

  const handleInput = (e: any) => {
    setPrice(e.target.value);
  }
     
  const handleSelect = (e: any) => {
    let filtered = props.coupons;
    if( e !== 'All') {
      filtered = props.coupons.filter((c) => {
        return c.category === e;
      });
      } 
    setSelect(e);
    setCoupons(filtered);
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
        {(select === "All" ? props.coupons : coupons).length > 0 ? (
          <div className="Table pt-2">
            <Table striped bordered hover>
              <thead>
                <th>Category</th>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
              </thead>
              <tbody>
                {(select === "All" ? props.coupons : coupons)
                  .filter((c) => {
                    return c.price! > price;
                  })
                  .map((c) => {
                    return <CouponItem key={c.id} coupon={c} />;
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
