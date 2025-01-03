const CartProductModel = require( "../models/cartproduct.js");
const UserModel = require( "../models/user.js");

const addToCartItemController = async (request, response) => {
    try {
        const userId = request.user.id; // This should be the user's ID from JWT
        const { productId } = request.body; // Expecting productId in the request body
        
        if (!productId) {
            return response.status(400).json({
                message: "Provide productId",
                error: true,
                success: false
            });
        }

        //console.log("User ID:", userId);
        //console.log("Product ID:", productId);

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        });

        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart"
            });
        }

        const cartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        });

        const save = await cartItem.save();
        //console.log("Saved Cart Item:", save);

        const updateCartUser = await UserModel.updateOne(
            { _id: userId }, 
            { $push: { shopping_cart: productId } }
        );

        if (!updateCartUser.modifiedCount) {
            return response.status(500).json({
                message: "Failed to update user's shopping cart",
                error: true,
                success: false
            });
        }

       // console.log("Updated User's Cart:", updateCartUser);

        return response.json({
            data: save,
            message: "Item added successfully",
            error: false,
            success: true
        });
    } catch (error) {
        console.error("Error in addToCartItemController:", error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};


 const getCartItemController = async(request,response)=>{
    try {
        const userId = request.userId

        const cartItem =  await CartProductModel.find({
            userId : userId
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

 const updateCartItemQtyController = async(request,response)=>{
    try {
        const userId = request.userId 
        const { _id,qty } = request.body

        if(!_id ||  !qty){
            return response.status(400).json({
                message : "provide _id, qty"
            })
        }

        const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : qty
        })

        return response.json({
            message : "Update cart",
            success : true,
            error : false, 
            data : updateCartitem
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

 const deleteCartItemQtyController = async(request,response)=>{
    try {
      const userId = request.userId // middleware
      const { _id } = request.body 
      
      if(!_id){
        return response.status(400).json({
            message : "Provide _id",
            error : true,
            success : false
        })
      }

      const deleteCartItem  = await CartProductModel.deleteOne({_id : _id, userId : userId })

      return response.json({
        message : "Item remove",
        error : false,
        success : true,
        data : deleteCartItem
      })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = {
    addToCartItemController,
    getCartItemController,
    updateCartItemQtyController,
    deleteCartItemQtyController
};