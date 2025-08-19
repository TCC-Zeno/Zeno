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
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const ProductName = req.body.ProductName;
    const Description = req.body.Description;
    const Category = req.body.Category;
    const Price = Number(req.body.Price.replace(",", "."));
    const Price1 = Number(req.body.Price1.replace(",", "."));
    const StockQuantity = Number(req.body.StockQuantity);
    const MinQuantity = Number(req.body.MinQuantity);
    const FixedQuantity = Number(req.body.FixedQuantity);
    const userId = req.body.userId;

    if (
      isNaN(Price) ||
      isNaN(Price1) ||
      isNaN(StockQuantity) ||
      isNaN(MinQuantity) ||
      isNaN(FixedQuantity)
    ) {
      return res.status(400).json({
        error: "Valores numéricos inválidos. Verifique preços e quantidades.",
      });
    }

    let SupplierInfo = req.body.SupplierInfo;
    let supplierId = null;

    if (
      req.body.SupplierName &&
      req.body.SupplierEmail &&
      req.body.SupplierNumber &&
      req.body.SupplierAddress
    ) {
      // Criar novo fornecedor
      const newSupplier = await addSupplier(
        req.body.SupplierName,
        req.body.SupplierEmail,
        req.body.SupplierNumber,
        req.body.SupplierAddress,
        userId
      );
      supplierId = newSupplier[0].id;
    } else if (SupplierInfo) {
      // Usar fornecedor existente
      try {
        if (typeof SupplierInfo === "string" && SupplierInfo.startsWith("{")) {
          SupplierInfo = JSON.parse(SupplierInfo);
          if (SupplierInfo.SupplierName) {
            const newSupplier = await addSupplier(
              SupplierInfo.SupplierName,
              SupplierInfo.SupplierEmail,
              SupplierInfo.SupplierNumber,
              SupplierInfo.SupplierAddress,
              userId
            );
            supplierId = newSupplier[0].id;
          }
        } else {
          // É um ID de fornecedor existente
          const parsedId = Number(SupplierInfo);
          if (!isNaN(parsedId) && parsedId > 0) {
            supplierId = parsedId;
          } else {
            return res
              .status(400)
              .json({ error: "ID do fornecedor inválido." });
          }
        }
      } catch (e) {
        console.error("Erro ao processar fornecedor:", e);
        return res
          .status(400)
          .json({ error: "Dados do fornecedor inválidos." });
      }
    } else {
      return res.status(400).json({ error: "Fornecedor não informado." });
    }

    // Validar se conseguimos um supplierId
    if (!supplierId) {
      return res
        .status(400)
        .json({ error: "Não foi possível identificar o fornecedor." });
    }

    // Upload da imagem
    let imageUrl = null;
    const ImageFile = req.file;
    if (ImageFile) {
      try {
        imageUrl = await uploadImage(ImageFile, userId);
      } catch (err) {
        console.error("Erro no upload:", err);
        return res.status(500).json({
          error: `Erro ao enviar imagem: ${err.message}`,
        });
      }
    } else {
      return res.status(400).json({
        error: "Imagem obrigatória não enviada.",
      });
    }

    // Criar produto
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

    console.log("Produto criado com sucesso:", productData);
    return res.status(201).json(productData);
  } catch (error) {
    console.error("Erro no createProduct:", error);
    return res.status(500).json({
      error: error.message,
      details: error.stack,
    });
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
        return res.status(400).json({
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
      res
        .status(500)
        .json({ error: `Erro interno ao enviar imagem: ${error.message}` });
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
