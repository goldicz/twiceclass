// CSIL Loan - JavaScript Functions

// Eligibility Checker Modal Functions
function checkEligibility() {
    console.log('checkEligibility function called');
    const modal = document.getElementById('eligibilityModal');
    const modalCard = document.getElementById('modalCard');
    
    console.log('Modal element:', modal);
    console.log('Modal card element:', modalCard);
    
    if (modal) {
        console.log('Opening modal...');
        modal.classList.remove('hidden');
        // Trigger animation
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            if (modalCard) {
                modalCard.classList.remove('scale-95');
                modalCard.classList.add('scale-100');
            }
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Reset form
        resetEligibilityCheck();
    } else {
        console.error('Modal element not found!');
    }
}

function closeEligibilityModal() {
    const modal = document.getElementById('eligibilityModal');
    const modalCard = document.getElementById('modalCard');
    
    if (modal) {
        modal.classList.add('opacity-0');
        modalCard.classList.remove('scale-100');
        modalCard.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function resetEligibilityCheck() {
    // Reset form fields
    document.getElementById('ageSelect').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    
    // Hide results
    document.getElementById('eligibilityResults').classList.add('hidden');
    document.getElementById('successResult').classList.add('hidden');
    document.getElementById('failureResult').classList.add('hidden');
}

function checkEligibilityRequirements() {
    const age = document.getElementById('ageSelect').value;
    const hasValidId = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
    const hasAddress = document.querySelector('input[name="address"]:checked')?.value;
    
    let isEligible = true;
    let failureReasons = [];
    
    // Check age requirement
    if (!age || age === 'under18') {
        isEligible = false;
        if (!age) {
            failureReasons.push('Please select your age range');
        } else {
            failureReasons.push('You must be 18 years or older to apply');
        }
    }
    
    // Check ID requirement
    if (!hasValidId) {
        isEligible = false;
        failureReasons.push('You must have at least one valid form of ID');
    }
    
    // Check address requirement
    if (!hasAddress) {
        isEligible = false;
        failureReasons.push('Please confirm if you have a verifiable Nigerian address');
    } else if (hasAddress === 'no') {
        isEligible = false;
        failureReasons.push('You must have a verifiable address in Nigeria');
    }
    
    // Show results
    showEligibilityResults(isEligible, failureReasons);
}

function showEligibilityResults(isEligible, failureReasons) {
    const resultsContainer = document.getElementById('eligibilityResults');
    const successResult = document.getElementById('successResult');
    const failureResult = document.getElementById('failureResult');
    const failureReasonsContainer = document.getElementById('failureReasons');
    
    // Clear previous content
    resultsContainer.classList.remove('hidden');
    
    if (isEligible) {
        successResult.classList.remove('hidden');
        failureResult.classList.add('hidden');
        
        // Add celebration animation
        setTimeout(() => {
            successResult.style.animation = 'slideInUp 0.5s ease-out';
        }, 100);
        
    } else {
        failureResult.classList.remove('hidden');
        successResult.classList.add('hidden');
        
        // Populate failure reasons
        if (failureReasonsContainer && failureReasons.length > 0) {
            failureReasonsContainer.innerHTML = failureReasons.map(reason => `
                <div class="flex items-start space-x-2">
                    <svg class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs text-gray-700">${reason}</span>
                </div>
            `).join('');
        }
        
        // Add shake animation
        setTimeout(() => {
            failureResult.style.animation = 'shake 0.5s ease-in-out';
        }, 100);
    }
    
    // Scroll to results section smoothly
    setTimeout(() => {
        const scrollableArea = document.querySelector('#modalCard .overflow-y-auto');
        if (scrollableArea) {
            scrollableArea.scrollTo({
                top: scrollableArea.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, 200);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('eligibilityModal');
    if (event.target === modal) {
        closeEligibilityModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEligibilityModal();
    }
});

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.remove('hidden');
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('text-primary'));
    
    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Investment calculator
function calculateInvestment() {
    const initial = parseFloat(document.getElementById('initial-amount')?.value) || 100000;
    const rate = parseFloat(document.getElementById('annual-return')?.value) || 12;
    const years = parseFloat(document.getElementById('time-period')?.value) || 1;
    
    const final = initial * Math.pow(1 + rate/100, years);
    const profit = final - initial;
    const roiPercentage = rate;
    
    // Update display with Nigerian formatting
    const finalElement = document.getElementById('final-amount');
    const profitElement = document.getElementById('total-profit');
    const roiElement = document.getElementById('roi-percentage');
    
    if (finalElement) {
        finalElement.textContent = Math.round(final).toLocaleString('en-NG');
    }
    if (profitElement) {
        profitElement.textContent = Math.round(profit).toLocaleString('en-NG');
    }
    if (roiElement) {
        roiElement.textContent = roiPercentage;
    }
}

// Investment plan selection
function selectPlan(planType) {
    const planDetails = {
        'conservative': {
            name: 'Conservative Plan',
            returns: '8-10% annually',
            minimum: '₦50,000',
            risk: 'Low'
        },
        'balanced': {
            name: 'Balanced Plan',
            returns: '12-15% annually',
            minimum: '₦100,000',
            risk: 'Medium'
        },
        'aggressive': {
            name: 'Aggressive Plan',
            returns: '18-25% annually',
            minimum: '₦250,000',
            risk: 'High'
        }
    };
    
    const plan = planDetails[planType];
    if (plan) {
        const message = `You've selected the ${plan.name}!\n\n` +
                       `Expected Returns: ${plan.returns}\n` +
                       `Minimum Investment: ${plan.minimum}\n` +
                       `Risk Level: ${plan.risk}\n\n` +
                       `Would you like to proceed with this investment plan?`;
        
        if (confirm(message)) {
            // In a real implementation, this would redirect to investment form
            alert('Redirecting to investment application form...');
        }
    }
}

// Removed duplicate checkEligibility function - using modal version instead

// Show referral program
function showReferralProgram() {
    const message = `CSIL Loan Referral Program\n\n` +
                   `💰 Earn ₦1,000 for every successful loan referral\n` +
                   `🚀 Your friends get priority processing\n` +
                   `📈 No limit on referrals - earn unlimited rewards\n` +
                   `⚡ Instant payout after loan disbursement\n\n` +
                   `Contact us on WhatsApp to get your unique referral code!`;
    
    alert(message);
}

// File Upload Handler
function handleFileUpload(input, labelId) {
    const label = document.getElementById(labelId);
    const file = input.files[0];
    
    if (file) {
        // Check file size (5MB for documents, 2MB for photos)
        const maxSize = input.accept.includes('image') ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
        
        if (file.size > maxSize) {
            alert(`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
            input.value = '';
            return;
        }
        
        // Update label to show file name
        label.textContent = `✓ ${file.name}`;
        label.classList.add('text-secondary', 'font-semibold');
        
        // Add visual feedback
        input.parentElement.classList.add('border-secondary', 'bg-green-50');
        input.parentElement.classList.remove('border-gray-300');
        
        // Add animation
        input.parentElement.classList.add('upload-success');
        setTimeout(() => {
            input.parentElement.classList.remove('upload-success');
        }, 600);
    }
}

// Loan Calculator Functions
function updateLoanCalculator() {
    const amount = document.getElementById('loanAmount').value;
    const term = document.getElementById('loanTerm').value;
    const rate = document.getElementById('interestRate').value;
    
    // Update display values
    document.getElementById('loanAmountDisplay').textContent = '₦' + parseInt(amount).toLocaleString();
    document.getElementById('loanTermDisplay').textContent = term + ' months';
    document.getElementById('interestRateDisplay').textContent = rate + '%';
    
    // Calculate monthly payment
    const monthlyRate = (rate / 100) / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - amount;
    
    // Update calculated values
    document.getElementById('monthlyPayment').textContent = '₦' + Math.round(monthlyPayment).toLocaleString();
    document.getElementById('totalInterest').textContent = '₦' + Math.round(totalInterest).toLocaleString();
    document.getElementById('totalAmount').textContent = '₦' + Math.round(totalAmount).toLocaleString();
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to calculator inputs
    const loanAmount = document.getElementById('loanAmount');
    const loanTerm = document.getElementById('loanTerm');
    const interestRate = document.getElementById('interestRate');
    
    if (loanAmount && loanTerm && interestRate) {
        loanAmount.addEventListener('input', updateLoanCalculator);
        loanTerm.addEventListener('input', updateLoanCalculator);
        interestRate.addEventListener('input', updateLoanCalculator);
        
        // Initial calculation
        updateLoanCalculator();
    }
});

function startApplication() {
    // Scroll to application form
    document.getElementById('loanApplicationForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// FAQ Toggle Function
function toggleFAQ(faqId) {
    const faq = document.getElementById(faqId);
    const button = faq.previousElementSibling;
    const icon = button.querySelector('svg');
    
    if (faq.classList.contains('hidden')) {
        faq.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        faq.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loanApplicationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    field.focus();
                } else {
                    field.classList.remove('border-red-500');
                    field.classList.add('border-green-500');
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Application submitted successfully! We will review your application and get back to you within 24 hours.');
                
                // In a real application, you would submit the form data to your server here
                // form.submit();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Format Nigerian phone numbers
function formatNigerianPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Add +234 prefix if not present
    if (value.length === 10 && value.startsWith('0')) {
        value = '234' + value.substring(1);
    } else if (value.length === 11 && value.startsWith('0')) {
        value = '234' + value.substring(1);
    }
    
    // Format as +234 XXX XXX XXXX
    if (value.startsWith('234') && value.length === 13) {
        value = '+234 ' + value.substring(3, 6) + ' ' + value.substring(6, 9) + ' ' + value.substring(9);
    }
    
    input.value = value;
}

// Add phone number formatting to phone inputs
function initializePhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatNigerianPhone(input));
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calculator
    calculateInvestment();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize phone formatting
    initializePhoneFormatting();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Add WhatsApp button pulse animation
    const whatsappBtn = document.querySelector('.fixed.bottom-6.right-6 a');
    if (whatsappBtn) {
        whatsappBtn.classList.add('whatsapp-pulse');
    }
    
    console.log('CSIL Loan website initialized successfully! 🚀');
});
