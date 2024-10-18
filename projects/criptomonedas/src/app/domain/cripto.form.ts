import { FormControl } from "@angular/forms";

import { Crypto } from "@domain";

export type CriptoForm = Record<keyof Crypto, FormControl>;
