import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: "user" },
		budgets: [
			{
				name: { type: String, required: true },
				limit: { type: Number, required: true },
				transactions: [
					{
						amount: { type: Number, required: true },
						category: { type: String, required: true },
						date: { type: Date, required: true },
						description: { type: String, required: true },
						type: { type: String, required: true },
					},
				],
			},
		],
		trackedStocks: [
			{
				symbol: { type: String, required: true },
				name: { type: String, required: true },
				price: { type: Number, required: true },
			},
		],
	},
	{ timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
