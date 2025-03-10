const Supplier = require('../models/Supplier');

// Crear un nuevo registro de proveedor con cálculos automáticos
exports.createSupplierSale = async (req, res) => {
  try {
      console.log("📥 Datos recibidos en POST:", req.body);

      // Asegurar que los datos sean un array
      const suppliers = Array.isArray(req.body) ? req.body : [req.body];

      // Validar que todos los elementos tienen los datos requeridos
      for (const supplier of suppliers) {
          if (!supplier.idSaller || !supplier.suplierPrice) {
              return res.status(400).json({ message: "Error: 'idSaller' y 'suplierPrice' son obligatorios." });
          }

          supplier.suplierPrice = parseFloat(supplier.suplierPrice);
          if (isNaN(supplier.suplierPrice)) {
              return res.status(400).json({ message: "Error: 'suplierPrice' debe ser un número válido." });
          }

          supplier.salePrice = supplier.suplierPrice * 10;
          supplier.totalSale = supplier.salePrice - supplier.suplierPrice;
      }

      // Guardar todos los registros en la base de datos
      const newSuppliers = await Supplier.insertMany(suppliers);
      res.status(201).json(newSuppliers);

  } catch (error) {
      console.error(" Error en POST:", error);
      res.status(500).json({ message: "Error al crear el proveedor", error });
  }
};



// Obtener todos los registros
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores', error });
    }
};
