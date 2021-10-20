<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Chat;
use Carbon\Carbon; 

class DeleteOldChats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chats:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete chats that more than 3 days';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Chat::where('chatDateTime', '<', Carbon::now()->subDays(3))->delete();
        return 0;
    }
}
