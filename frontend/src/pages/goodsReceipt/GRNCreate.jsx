import React, { useEffect, useState } from "react";
import { createGoodsReceipt } from "../../services/goodsReceipt.service";
import axiosInstance from "../../api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";

const GRNCreate = () => {
  const [approvedPOs, setApprovedPOs] = useState([]);
  const [selectedPO, setSelectedPO] = useState(null);
  const [receivedItems, setReceivedItems] = useState([]);

  // Load approved POs
  useEffect(() => {
    axiosInstance.get("/purchase-orders").then(res => {
      const approved = res.data.filter(po => po.status === "Approved");
      setApprovedPOs(approved);
    });
  }, []);

  const handlePOSelect = (poId) => {
    const po = approvedPOs.find(p => p.id === Number(poId));
    setSelectedPO(po);

    const items = po.PurchaseOrderItems.map(item => ({
      itemId: item.itemId,
      name: item.Item.name,
      orderedQty: item.quantity,
      receivedQty: 0
    }));

    setReceivedItems(items);
  };

  const updateQty = (index, value) => {
    const updated = [...receivedItems];
    updated[index].receivedQty = Number(value);
    setReceivedItems(updated);
  };

  const submitGRN = async () => {
    const itemsPayload = receivedItems
      .filter(i => i.receivedQty > 0)
      .map(i => ({
        itemId: i.itemId,
        quantity: i.receivedQty
      }));

    if (!selectedPO || itemsPayload.length === 0) {
      return alert("Select PO and enter received quantity");
    }

    await createGoodsReceipt({
      purchaseOrderId: selectedPO.id,
      items: itemsPayload
    });

    alert("Goods received successfully");
  };

  return (
    <div className="container mt-4">
      <h4>Create Goods Receipt</h4>

      <select className="form-select mb-3" onChange={e => handlePOSelect(e.target.value)}>
        <option value="">Select Approved PO</option>
        {approvedPOs.map(po => (
          <option key={po.id} value={po.id}>
            PO #{po.id} - {po.Vendor.name}
          </option>
        ))}
      </select>

      {selectedPO && (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Ordered</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {receivedItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.orderedQty}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={item.orderedQty}
                      className="form-control"
                      onChange={e => updateQty(i, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success" onClick={submitGRN}>
            Submit GRN
          </button>
        </>
      )}
    </div>
  );
};

export default GRNCreate;
