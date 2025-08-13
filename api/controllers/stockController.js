import{
    addStock,
    addProduct,
    addSupplier,
    getStocks,
    updateStock,
    deleteStock
} from "../services/stockService.js";

export const createStock = async (req, res) => {
  try {
    const { quantity_of_product, product_id, userId } = req.body;
    const data = await addStock(quantity_of_product, product_id, userId);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, alert, product_category, minimum_quantity, image, fixed_quantity, userId } = req.body;
    const data = await addProduct(name, description, alert, product_category, minimum_quantity, image, fixed_quantity, userId);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const { name, email, telephone, location } = req.body;
    const data = await addSupplier(name, email, telephone, location);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
export const readStocks = async (req, res) => {
  try {
    const data = await getStocks();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockData = req.body;
    const data = await updateStock(id, stockData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteStock(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
