import { useEffect, useState, useRef } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Product } from "../models/Product";
import { useDeleteSingleProductMutation, useGetProductsQuery } from "../services/products";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<Product>();

const ProductsTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [deleteProduct] = useDeleteSingleProductMutation()
    const { data, isFetching } = useGetProductsQuery({ skip: (page - 1) * 10, limit: 10 });
    const navigate = useNavigate();
    const handleClickEdit = (id: number) => {
        navigate(`/products/${id}`);
    };
    const handleClickDelete = (id: number) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        deleteProduct({ id: Number(id) }).then(() => {
            toast.success("row deleted", { duration: 3000 });
        })
    };

    useEffect(() => {
        if (data) {
            setProducts((prevProducts) => [...prevProducts, ...data]);
        }
    }, [data]);

    const columns = [
        columnHelper.accessor("thumbnail", {
            header: () => <span className="text-gray-600 font-semibold">Thumbnail</span>,
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt={info.row.original.title}
                    className="rounded-md w-16 h-16 object-cover border border-gray-200"
                />
            ),
        }),
        columnHelper.accessor("title", {
            header: () => <span className="text-gray-600 font-semibold">Name</span>,
            cell: (info) => (
                <span className="font-semibold text-gray-800">{info.getValue()}</span>
            ),
        }),
        columnHelper.accessor("price", {
            header: () => <span className="text-gray-600 font-semibold">Price</span>,
            cell: (info) => <span className="text-gray-700">{`${info.getValue()}€`}</span>,
        }),
        columnHelper.display({
            id: "actions",
            header: () => <span className="text-gray-600 font-semibold">Actions</span>,
            cell: (info) => {
                return (
                    <div className="flex space-x-4">
                        <button onClick={() => handleClickEdit(info.row.original.id)} className="text-blue-500 hover:text-blue-700 flex items-center">
                            Edit
                        </button>
                        <button onClick={() => handleClickDelete(info.row.original.id)} className="text-red-500 hover:text-red-700 flex items-center">
                            Delete
                        </button>
                    </div>
                )
            },
        }),
    ];

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const rowVirtualizer = useVirtualizer({
        count: products.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => 70,
        overscan: 5,
    });

    const fetchMoreOnBottomReached = () => {
        if (!containerRef.current || isFetching) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", fetchMoreOnBottomReached);
            return () => container.removeEventListener("scroll", fetchMoreOnBottomReached);
        }
    }, [isFetching]);

    return (
        <div className="p-4">
            <div className="flex flex-row flex-1 justify-between" >
                <span className="text-4xl p-4" >Products</span>
                <button
                    type="button"
                    data-test="checkout-btn"
                    onClick={() => navigate('products-create')}
                    className="bg-white text-main  rounded-full p-2  uppercase border-2 border-main  my-4"
                >
                    Create New
                </button>
            </div>
            <div
                ref={containerRef}
                className="shadow-md bg-white border border-gray-300 rounded-lg h-[600px] relative overflow-y-auto"
                style={{
                    position: "relative",
                    height: "600px",
                    overflow: "auto",
                }}
            >
                <table className="min-w-full border-separate" style={{ borderSpacing: 0, display: "grid" }}>
                    <thead style={{ display: "grid", top: 0, zIndex: 1 }}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} style={{ display: "flex", width: "100%", justifyContent: 'space-around' }}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{
                                            display: "flex",
                                            width: header.getSize(),
                                        }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody
                        style={{
                            display: "grid",
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            position: "relative",
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const row = table.getRowModel().rows[virtualRow.index];
                            return (
                                <tr
                                    key={row.id}
                                    style={{
                                        display: "flex",
                                        position: "absolute",
                                        transform: `translateY(${virtualRow.start}px)`,
                                        width: "100%",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} style={{ display: "flex", width: cell.column.getSize() }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isFetching && <div className="text-center mt-4">Fetching More...</div>}
        </div>
    );
};

export default ProductsTable;
