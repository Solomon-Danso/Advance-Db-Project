<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class BulkProductsImport implements ToCollection
{
    protected $adminId;

    public function __construct($adminId)
    {
        $this->adminId = $adminId;
    }

    public function collection(Collection $rows)
    {
        // Skip the first row (header)
        foreach ($rows->skip(1) as $row) {
            $product = new Product();

            $product->uploadType    = "Bulk";
            $product->MenuName      = $row[0] ?? null;
            $product->CategoryName  = $row[1] ?? null;
            $product->ProductId     = $row[2] ?? uniqid("P_");
            $product->Title         = $row[3] ?? null;
            $product->Price         = $row[4] ?? null;
            $product->Quantity      = $row[5] ?? null;
            $product->Size          = $row[6] ?? null;
            $product->Description   = $row[7] ?? null;
            $product->Picture       = $row[8] ?? null;

            $product->save();

            // Optional: Audit log
            // Audit::create(['admin_id' => $this->adminId, 'action' => 'Created product: ' . $product->Title]);
        }
    }
}
