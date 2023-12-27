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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('gender', ['Male', 'Female'])->after('avatar')->nullable()->change();
            $table->string('address')->after('avatar')->nullable()->change();
            $table->tinyInteger('level')->default(4)->after('confirm_password')->comment('1: Admin Master, 2: Admin Manager, 3: Admin Editor, 4: Member')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
