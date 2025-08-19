import multer from "multer";
import {
  addProduct,
  addSupplier,
  getProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} from "../services/stockService.js";

export const createProduct = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    // Conversão de tipos e parsing de SupplierInfo
    const ProductName = req.body.ProductName;
    const Description = req.body.Description;
    const Category = req.body.Category;
    const Price = Number(req.body.Price);
    const Price1 = Number(req.body.Price1);
    const StockQuantity = Number(req.body.StockQuantity);
    const MinQuantity = Number(req.body.MinQuantity);
    const FixedQuantity = Number(req.body.FixedQuantity);
    const userId = req.body.userId;

    let SupplierInfo = req.body.SupplierInfo;
    let supplierId = null;

    // Se vier como string de objeto, tenta fazer parse
    try {
      if (SupplierInfo && typeof SupplierInfo === 'string' && SupplierInfo.startsWith('{')) {
        SupplierInfo = JSON.parse(SupplierInfo);
      }
    } catch (e) {
      // ignora, deixa como string
    }

    if (SupplierInfo && typeof SupplierInfo === "number") {
      supplierId = SupplierInfo;
    } else if (
      SupplierInfo && typeof SupplierInfo === 'object' &&
      SupplierInfo.SupplierName &&
      SupplierInfo.SupplierNumber &&
      SupplierInfo.SupplierAddress &&
      SupplierInfo.SupplierEmail
    ) {
      const newSupplier = await addSupplier(
        SupplierInfo.SupplierName,
        SupplierInfo.SupplierEmail,
        SupplierInfo.SupplierNumber,
        SupplierInfo.SupplierAddress,
        userId
      );
      supplierId = newSupplier[0].id;
    } else if (SupplierInfo) {
      // tenta converter para número
      const parsedId = Number(SupplierInfo);
      if (!isNaN(parsedId)) {
        supplierId = parsedId;
      } else {
        return res.status(400).json({ error: "Fornecedor não informado corretamente." });
      }
    } else {
      return res.status(400).json({ error: "Fornecedor não informado corretamente." });
    }

    // 2) Imagem
    let imageUrl = null;
    const ImageFile = req.file;
    if (ImageFile) {
      try {
        imageUrl = await uploadImage(ImageFile, userId);
      } catch (err) {
        return res.status(500).json({
          error: `Erro ao enviar imagem: ${err.message}`,
        });
      }
    } else {
      return res.status(400).json({
        error: "Imagem obrigatória não enviada.",
      });
    }

    // 3) Criar produto
    const productData = await addProduct(
      ProductName,
      Description,
      Category,
      MinQuantity,
      imageUrl,
      FixedQuantity,
      userId,
      StockQuantity,
      Price,
      Price1,
      supplierId
    );

    return res.status(201).json(productData);
  } catch (error) {
    console.error("Erro no createProduct:", error);
    return res.status(500).json({ error: error.message });
  }
};



export const createSupplier = async (req, res) => {
  try {
    const { name, email, Number, Address } = req.body;
    const data = await addSupplier(name, email, Number, Address);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const upload = multer({ storage: multer.memoryStorage() });
export const uploadProductImage = [
  upload.single("image"),
  async (req, res) => {
    const { uuid } = req.body;
    const file = req.file;
    try {
      if (!uuid) {
        return res.status(400).json({ error: "ID não informado." });
      }
      const user = await getProduct(uuid);
      if (!user) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado para o ID informado." });
      }
      if (!file) {
        return res
          .status(400)
          .json({
            error:
              'Arquivo não encontrado no request. Use o campo "logo" no formData.',
          });
      }
      const uploadedImage = await uploadImage(file, uuid);
      if (!uploadedImage) {
        return res.status(400).json({
          error: "Falha ao enviar imagem. Verifique os dados enviados.",
        });
      }
      return res.status(200).json(uploadedImage);
    } catch (error) {
      res.status(500).json({ error: `Erro interno ao enviar imagem: ${error.message}` });
    }
  },
];


export const readProduct = async (req, res) => {
  try {
    const data = await getProduct();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockData = req.body;
    const data = await updateProduct(id, stockData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteProduct(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readSupplier = async (req, res) => {
  try {
    const data = await getSupplier();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockData = req.body;
    const data = await updateSupplier(id, stockData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteSupplier(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};