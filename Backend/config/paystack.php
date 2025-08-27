<?php

/*
 * This file is part of the Laravel Paystack package.
 *
 * (c) Prosper Otemuyiwa <prosperotemuyiwa@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [

   /**
     * Public Key From Paystack Dashboard
     *
     */
    'publicKey' => function () {
        $shortName = Config::get('dynamic.shortName'); // Retrieve ShortName set by the middleware
        return env($shortName . '_PUBLIC_KEY');
    },

      /**
     * Secret Key From Paystack Dashboard
     *
     */
    'secretKey' => function () {
        $shortName = Config::get('dynamic.shortName'); // Retrieve ShortName set by the middleware
        return env($shortName . '_SECRET_KEY');
    },

    /**
     * Paystack Payment URL
     *
     */
    'paymentUrl' => getenv('PAYSTACK_PAYMENT_URL'),

     /**
     * Optional email address of the merchant
     *
     */
    'merchantEmail' => function () {
        $shortName = Config::get('dynamic.shortName'); // Retrieve ShortName set by the middleware
        return env($shortName . '_MERCHANT_EMAIL');
    }
];
