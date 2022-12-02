/* import User from "../models/user";
import Visits from "../models/visits";
import { addYears, startOfYear, subYears } from "date-fns";

function getStatistic(model, { start, today }, { amount = false } = {}) {
    return model.aggregate([
        {
            $match: {
                createdAt: { $gte: start, $lt: today },
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
                ...(amount ? { amount: { $sum: "$totalPrice" } } : {}),
            },
        },
    ]);
}
export const getStats = async (req, res, next) => {
    try {
        var today = new Date();
        var start = subYears(today, 1);

        var [products, costumers, purchases, visits] = await Promise.all([
            getStatistic(Products, { start, today }),
            getStatistic(User, { start, today }),
            getStatistic(Purchases, { start, today }, { amount: true }),
            Visits.find({
                date: { $gte: start, $lt: today },
            }).sort({ date: 1 }),
        ]);
        res.json({ products, costumers, purchases, visits });
    } catch (e) {
        console.error(e);
        next(e);
    }
};
export const getStatsRevenue = async (req, res, next) => {
    try {
        const year = new Date(Number(req.query.year), 0);
        var start = startOfYear(year);
        var ends = addYears(start, 1);
        res.json(
            await Purchases.aggregate([
                {
                    $match: {
                        createdAt: { $gte: start, $lt: ends },
                    },
                },
                {
                    $sort: {
                        createdAt: 1,
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                            status: "$status",
                        },
                        count: { $sum: 1 },
                        amount: { $sum: "$totalPrice" },
                    },
                },
            ])
        );
    } catch (e) {
        next(e);
    }
};
 */
