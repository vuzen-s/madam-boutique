<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cart_detail', function (Blueprint $table) {
            $table->string('name_customer')->after('id');
            $table->string('phone_customer')->after('name_customer');
            $table->string('address_customer')->after('phone_customer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_detail', function (Blueprint $table) {
            //
        });
    }
};
